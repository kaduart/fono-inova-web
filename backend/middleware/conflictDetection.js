import { SESSION_DURATION_MS } from '../config/constants.js';
import Appointment from '../models/Appointment.js';

export const checkAppointmentConflicts = async (req, res, next) => {
    try {
        const { doctorId, patientId, date } = req.body;
        const appointmentId = req.body.metadata?.appointmentId || null;

        if (!doctorId || !patientId || !date) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        const startTime = new Date(date);
        if (isNaN(startTime.getTime())) {
            return res.status(400).json({ error: "Data inválida" });
        }

        const SESSION_DURATION = SESSION_DURATION_MS;
        const endTime = new Date(startTime.getTime() + SESSION_DURATION);

        const startOfDay = new Date(startTime);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(startTime);
        endOfDay.setHours(23, 59, 59, 999);

        // Modificação 1: Ignorar agendamentos cancelados para médico
        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: startOfDay, $lt: endOfDay },
            status: { $ne: 'cancelado' }, // Ignora cancelados
            ...(appointmentId && { _id: { $ne: appointmentId } }) // Exclui o próprio agendamento
        });

        // Modificação 2: Verificação de conflito considerando apenas agendamentos ativos
        const hasDoctorConflict = existingAppointments.some(app => {
            const appStart = new Date(app.date);
            const appEnd = new Date(appStart.getTime() + SESSION_DURATION);
            return startTime < appEnd && endTime > appStart;
        });

        if (hasDoctorConflict) {
            return res.status(409).json({
                error: 'Conflito de horário',
                message: 'Médico já possui agendamento ativo neste horário'
            });
        }

        // Modificação 3: Ignorar agendamentos cancelados para paciente
        const patientAppointments = await Appointment.find({
            patientId,
            date: { $gte: startOfDay, $lt: endOfDay },
            status: { $ne: 'cancelado' }, // Ignora cancelados
            ...(appointmentId && { _id: { $ne: appointmentId } }) // Exclui o próprio agendamento
        });

        // Modificação 4: Verificação de conflito para paciente
        const hasPatientConflict = patientAppointments.some(app => {
            const appStart = new Date(app.date);
            const appEnd = new Date(appStart.getTime() + SESSION_DURATION);
            return startTime < appEnd && endTime > appStart;
        });

        if (hasPatientConflict) {
            return res.status(409).json({
                error: 'Conflito de horário',
                message: 'Paciente já possui agendamento ativo neste horário'
            });
        }

        next();
    } catch (error) {
        console.error('Erro em checkAppointmentConflicts:', error);
        res.status(500).json({ error: 'Erro interno ao verificar conflitos' });
    }
};


export const getAvailableTimeSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ error: 'Médico e data são obrigatórios' });
        }

        const SESSION_DURATION_MINUTES = 40;
        const BLOCKED_DOCTOR_ID = '684072213830f473da1b0b0b';

        // Função para criar datas no fuso UTC-3
        const toUtc3 = (h, m) => {
            const [year, month, day] = date.split('-').map(Number);
            return new Date(Date.UTC(year, month - 1, day, h + 3, m));
        };

        const start = toUtc3(8, 0); // 08:00
        const end = toUtc3(18, 0);  // 18:00

        // Busca TODOS os agendamentos do dia
        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: start, $lte: end }
        });

        // Gera todos os slots possíveis
        const slots = [];
        let current = new Date(start);

        while ((current.getTime() + SESSION_DURATION_MINUTES * 60000) <= end.getTime()) {
            slots.push(new Date(current));
            current = new Date(current.getTime() + SESSION_DURATION_MINUTES * 60000);
        }

        // Filtra slots disponíveis
        const availableSlots = slots.filter(slot => {
            const slotStartTime = slot.getTime();
            const slotEndTime = slotStartTime + SESSION_DURATION_MINUTES * 60000;
            const hour = slot.getUTCHours() - 3;

            // Bloquear horário de almoço para médico específico
            if (doctorId === BLOCKED_DOCTOR_ID && hour >= 12 && hour < 14) {
                return false;
            }

            // Verifica conflito apenas com agendamentos ATIVOS
            const hasConflict = existingAppointments.some(app => {
                // Ignora agendamentos cancelados
                if (app.status === 'cancelado') return false;

                const appStartTime = new Date(app.date).getTime();
                const appEndTime = appStartTime + SESSION_DURATION_MINUTES * 60000;

                // Verifica sobreposição de horários
                return slotStartTime < appEndTime && slotEndTime > appStartTime;
            });

            return !hasConflict;
        });

        // Formata os horários
        const formatted = availableSlots.map(slot => {
            const hours = slot.getUTCHours() - 3;
            const localHours = (hours + 24) % 24;
            const minutes = slot.getUTCMinutes();
            return `${String(localHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        });

        return res.json(formatted);
    } catch (error) {
        console.error('Erro ao obter horários disponíveis:', error);
        return res.status(500).json({ error: error.message });
    }
};










