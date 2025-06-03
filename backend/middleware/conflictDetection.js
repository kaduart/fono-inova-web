import Appointment from '../models/Appointment.js';

export const checkAppointmentConflicts = async (req, res, next) => {
    try {
        const { doctorId, patientId, date, time } = req.body;
        const appointmentId = req.body.metadata?.appointmentId || null;


        if (!date || !doctorId || !patientId || !time) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        if (!/^\d{2}:\d{2}$/.test(time)) {
            return res.status(400).json({ error: "Formato de hora inválido (esperado HH:mm)" });
        }

        const [year, month, day] = date.split(' ')[0].split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        const startTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);

        const startOfDay = new Date(appointmentDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(appointmentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const query = {
            doctorId,
            date: { $gte: startOfDay, $lt: endOfDay },
            ...(appointmentId && { _id: { $ne: appointmentId } })
        };

        const existingAppointments = await Appointment.find(query);

        const hasConflict = existingAppointments.some(app => {
            const [appHours, appMinutes] = app.time.split(':').map(Number);
            const appStart = new Date(app.date);
            appStart.setHours(appHours, appMinutes, 0, 0);

            const appEnd = new Date(appStart);
            appEnd.setMinutes(appEnd.getMinutes() + SESSION_DURATION_MINUTES);

            return startTime < appEnd && endTime > appStart;
        });

        if (hasConflict) {
            return res.status(409).json({
                error: 'Conflito de horário',
                message: 'Médico já possui agendamento neste horário'
            });
        }

        const patientQuery = {
            patientId,
            date: { $gte: startOfDay, $lt: endOfDay },
            ...(appointmentId && { _id: { $ne: appointmentId } })
        };

        const patientAppointments = await Appointment.find(patientQuery);
        const patientConflict = patientAppointments.find(appointment => {
            const [appHours, appMinutes] = appointment.time.split(':').map(Number);

            const appStartTime = new Date(appointmentDate);
            appStartTime.setHours(appHours, appMinutes, 0, 0);

            const appEndTime = new Date(appStartTime);
            appEndTime.setHours(appEndTime.getHours() + 1);

            return (startTime < appEndTime && endTime > appStartTime);
        });

        if (patientConflict) {
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

        // 1. Definir intervalo da data em horário de Brasília (UTC-3)
        const localDate = new Date(`${date}T00:00:00-03:00`);
        const startOfDayUTC = new Date(localDate.toISOString());
        const endOfDayUTC = new Date(new Date(localDate).setHours(23, 59, 59, 999));

        // 2. Buscar agendamentos existentes no MongoDB dentro do intervalo
        const existingAppointments = await Appointment.find({
            doctorId,
            date: {
                $gte: startOfDayUTC,
                $lt: new Date(endOfDayUTC.toISOString()),
            }
        });
        // 3. Gerar todos os slots do dia (8h às 18h, duração 40 minutos)
        const slots = [];
        const slotStart = new Date(`${date}T08:00:00-03:00`);
        const lastPossibleStart = new Date(`${date}T17:20:00-03:00`);

        let current = new Date(slotStart);
        while (current <= lastPossibleStart) {
            slots.push(new Date(current));
            current = new Date(current.getTime() + SESSION_DURATION_MINUTES * 60000);
        }

        // 4. Filtrar slots disponíveis (sem sobreposição com agendamentos)
        const availableSlots = slots.filter(slot => {
            const slotStart = slot;
            const slotEnd = new Date(slotStart.getTime() + SESSION_DURATION_MINUTES * 60000);

            return !existingAppointments.some(app => {
                const [hours, minutes] = app.time.split(':').map(Number);
                const appStart = new Date(app.date);
                appStart.setHours(hours, minutes, 0, 0)
                const appEnd = new Date(appStart.getTime() + SESSION_DURATION_MINUTES * 60000);

                return slotStart < appEnd && slotEnd > appStart;
            });
        });
        // 5. Formatar slots para HH:mm
        const formattedSlots = availableSlots.map(slot => {
            const h = slot.getHours().toString().padStart(2, '0');
            const m = slot.getMinutes().toString().padStart(2, '0');
            return `${h}:${m}`;
        });

        return res.json(formattedSlots);
    } catch (error) {
        console.error('Erro ao obter horários disponíveis:', error);
        return res.status(500).json({ error: error.message });
    }
};



