import Appointment from '../models/Appointment.js';

export const checkAppointmentConflicts = async (req, res, next) => {
    console.log('INICIOU -> requisicao ->', req);
    try {
        const { doctorId, patientId, date } = req.body;
        const appointmentId = req.body.metadata?.appointmentId || null;

        if (!doctorId || !patientId || !date) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        const startTime = new Date(date); // já vem ISO
        console.log('00', startTime);
        if (isNaN(startTime.getTime())) {
            return res.status(400).json({ error: "Data inválida" });
        }

        const SESSION_DURATION = 60 * 60 * 1000; // 1h (ajuste se for 40 min)

        const endTime = new Date(startTime.getTime() + SESSION_DURATION);
        console.log('01', endTime);

        const startOfDay = new Date(startTime);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(startTime);
        endOfDay.setHours(23, 59, 59, 999);
        console.log('02', startOfDay);

        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: startOfDay, $lt: endOfDay },
            ...(appointmentId && { _id: { $ne: appointmentId } })
        });
        console.log('03', existingAppointments);

        const hasDoctorConflict = existingAppointments.some(app => {
            const appStart = new Date(app.date);
            const appEnd = new Date(appStart.getTime() + SESSION_DURATION);
            return startTime < appEnd && endTime > appStart;
        });
        console.log('04', hasDoctorConflict);

        if (hasDoctorConflict) {
            return res.status(409).json({
                error: 'Conflito de horário',
                message: 'Médico já possui agendamento neste horário'
            });
        }

        const patientAppointments = await Appointment.find({
            patientId,
            date: { $gte: startOfDay, $lt: endOfDay },
            ...(appointmentId && { _id: { $ne: appointmentId } })
        });
        console.log('05', patientAppointments);

        const hasPatientConflict = patientAppointments.some(app => {
            const appStart = new Date(app.date);
            const appEnd = new Date(appStart.getTime() + SESSION_DURATION);
            return startTime < appEnd && endTime > appStart;
        });
        console.log('06', hasPatientConflict);

        if (hasPatientConflict) {
            return res.status(409).json({
                error: 'Conflito de horário',
                message: 'Paciente já possui agendamento neste horário'
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

        // Timezone fixo UTC-3
        const toUtcDate = (timeStr) => {
            return new Date(`${date}T${timeStr}:00-03:00`);
        };

        const startOfDay = toUtcDate('00:00');
        const endOfDay = toUtcDate('23:59');

        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // Gera os slots entre 08:00 e 17:20 (último início possível)
        const slots = [];
        let current = toUtcDate('08:00');
        const end = toUtcDate('17:20');

        while (current <= end) {
            slots.push(new Date(current));
            current = new Date(current.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);
        }

        // Remove os que colidem com agendamentos
        const availableSlots = slots.filter(slot => {
            const slotEnd = new Date(slot.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);
            return !existingAppointments.some(app => {
                const appStart = new Date(app.date);
                const appEnd = new Date(appStart.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);
                return slot < appEnd && slotEnd > appStart;
            });
        });

        // Formata para HH:mm em UTC-3
        const formatted = availableSlots.map(slot => {
            const local = new Date(slot);
            const h = String(local.getHours()).padStart(2, '0');
            const m = String(local.getMinutes()).padStart(2, '0');
            return `${h}:${m}`;
        });

        return res.json(formatted);
    } catch (error) {
        console.error('Erro ao obter horários disponíveis:', error);
        return res.status(500).json({ error: error.message });
    }
};










