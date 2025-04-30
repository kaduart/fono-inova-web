import Appointment from '../models/Appointment.js';

export const checkAppointmentConflicts = async (req, res, next) => {
    try {
        const { doctorId, date, time, appointmentId } = req.body;

        // Converter string de tempo para objetos Date para comparação precisa
        const appointmentDate = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);

        // Definir horário de início
        const startTime = new Date(appointmentDate);
        startTime.setHours(hours, minutes, 0, 0);

        // Definir horário de término (assumindo consultas de 1 hora)
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);

        // Buscar agendamentos existentes para o mesmo médico na mesma data
        const existingAppointments = await Appointment.find({
            doctorId,
            date: {
                $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
                $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
            },
            _id: { $ne: appointmentId } // Excluir o próprio agendamento em caso de edição
        });

        // Verificar conflitos de horário
        const conflictingAppointment = existingAppointments.find(appointment => {
            const appointmentTime = appointment.time;
            const [appHours, appMinutes] = appointmentTime.split(':').map(Number);

            const appStartTime = new Date(appointmentDate);
            appStartTime.setHours(appHours, appMinutes, 0, 0);

            const appEndTime = new Date(appStartTime);
            appEndTime.setHours(appEndTime.getHours() + 1);

            // Verificar sobreposição de horários
            return (startTime < appEndTime && endTime > appStartTime);
        });

        if (conflictingAppointment) {
            return res.status(409).json({
                error: 'Conflito de horário detectado',
                message: 'O profissional já possui outro agendamento neste horário',
                conflictingAppointment
            });
        }

        // Verificar também se o paciente já tem agendamento no mesmo horário
        const patientId = req.body.patientId;
        const patientAppointments = await Appointment.find({
            patientId,
            date: {
                $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
                $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
            },
            _id: { $ne: appointmentId }
        });

        const patientConflict = patientAppointments.find(appointment => {
            const appointmentTime = appointment.time;
            const [appHours, appMinutes] = appointmentTime.split(':').map(Number);

            const appStartTime = new Date(appointmentDate);
            appStartTime.setHours(appHours, appMinutes, 0, 0);

            const appEndTime = new Date(appStartTime);
            appEndTime.setHours(appEndTime.getHours() + 1);

            return (startTime < appEndTime && endTime > appStartTime);
        });

        if (patientConflict) {
            return res.status(409).json({
                error: 'Conflito de horário detectado',
                message: 'O paciente já possui outro agendamento neste horário',
                conflictingAppointment: patientConflict
            });
        }

        // Se não houver conflitos, continuar
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
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