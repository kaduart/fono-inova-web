import Appointment from '../models/Appointment.js';

export const checkAppointmentConflicts = async (req, res, next) => {
    try {
        const { doctorId, patientId, date, time } = req.body;
        const appointmentId = req.body.metadata?.appointmentId || null;

        console.log('Verificando conflitos para:', { doctorId, patientId, date, time });

        if (!date || !doctorId || !patientId || !time) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        if (!/^\d{2}:\d{2}$/.test(time)) {
            return res.status(400).json({ error: "Formato de hora inválido (esperado HH:mm)" });
        }

        const appointmentDate = new Date(date);
        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({ error: "Data inválida" });
        }

        // Construir startTime com data + hora
        const [hours, minutes] = time.split(':').map(Number);
        const startTime = new Date(appointmentDate);
        startTime.setHours(hours, minutes, 0, 0);

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
            const appStart = new Date(app.date);
            const appEnd = new Date(appStart);
            appEnd.setHours(appEnd.getHours() + 1);

            return startTime < appEnd && endTime > appStart;
        });

        console.log('Conflitos encontrados:', hasConflict);
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



// Função para buscar horários disponíveis
export const getAvailableTimeSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ error: 'Médico e data são obrigatórios' });
        }

        // Buscar agendamentos existentes para o médico na data especificada
        const appointmentDate = new Date(date);
        const existingAppointments = await Appointment.find({
            doctorId,
            date: {
                $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
                $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
            }
        });

        // Horários de funcionamento (8h às 18h)
        const workingHours = [];
        for (let hour = 8; hour < 18; hour++) {
            workingHours.push(`${hour.toString().padStart(2, '0')}:00`);
            workingHours.push(`${hour.toString().padStart(2, '0')}:30`);
        }

        // Remover horários já agendados
        const bookedTimes = existingAppointments.map(app => app.time);
        const availableSlots = workingHours.filter(time => !bookedTimes.includes(time));

        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};