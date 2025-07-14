import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js';
import { checkAppointmentConflicts, getAvailableTimeSlots } from '../middleware/conflictDetection.js';
import validateId from '../middleware/validateId.js';
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import { updatePatientAppointments } from '../utils/appointmentUpdater.js';
const ObjectId = mongoose.Types.ObjectId;

class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
    }
}

dotenv.config();
const router = express.Router();

// Verifica horários disponíveis
router.get('/available-slots', auth, getAvailableTimeSlots);

// Cria um novo agendamento
router.post('/', auth, checkAppointmentConflicts, async (req, res) => {
    try {
        const doctorId = req.body.doctorId || req.user.id;

        if (req.user.role === 'patient') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        // 1. Buscar paciente sem restrição de médico (admin pode acessar qualquer paciente)
        const patient = await Patient.findById(req.body.patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Paciente nao encontrado' });
        }

        // 2. Se o paciente não tem doctor, atualize com o doctor do agendamento
        if (!patient.doctor) {
            patient.doctor = doctorId;
            await patient.save();
        }
        // 3. Se for médico, verificar propriedade
        else if (req.user.role === 'doctor' && patient.doctor.toString() !== doctorId) {
            return res.status(403).json({
                error: 'Acesso negado',
                message: 'Este paciente não pertence ao seu consultório'
            });
        }

        // 4. Criar agendamento
        const appointmentData = {
            date: req.body.date,
            time: req.body.time,
            sessionType: req.body.sessionType,
            notes: req.body.notes,
            paymentAmount: req.body.paymentAmount,
            paymentMethod: req.body.paymentMethod,
            specialty: req.body.specialty || patient.specialty,
            doctor: doctorId,
            patient: req.body.patientId,
            operationalStatus: 'agendado',
            clinicalStatus: 'pendente',
        };

        const appointment = new Appointment(appointmentData);
        await appointment.save();

        // 5. Atualizar lista de agendamentos do paciente
        patient.appointments = patient.appointments || [];
        patient.appointments.push(appointment._id);
        await patient.save();
        await updatePatientAppointments(req.body.patientId);
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Erro completo:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            body: req.body,
            user: req.user
        });

        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});
            return res.status(400).json({ message: 'Falha na validação dos dados', errors });
        }

        return res.status(500).json({
            error: 'Erro interno',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Busca agendamentos com filtros
router.get('/', auth, async (req, res) => {
    try {
        const { patientId, doctorId, status, specialty } = req.query;
        const filter = {};

        if (patientId && patientId !== 'all' && mongoose.Types.ObjectId.isValid(patientId)) {
            filter.patient = new mongoose.Types.ObjectId(patientId);
        }

        if (doctorId && doctorId !== 'all' && mongoose.Types.ObjectId.isValid(doctorId)) {
            filter.doctor = new mongoose.Types.ObjectId(doctorId);
        }

        if (status && status !== 'all') filter.status = status;
        if (specialty && specialty !== 'all') filter.specialty = specialty;

        const populatePatient = {
            path: 'patient',
            select: 'fullName dateOfBirth gender phone email cpf rg address appointments lastAppointment nextAppointment',
            populate: [
                {
                    path: 'appointments',
                    populate: { path: 'doctor', select: 'fullName specialty' }
                },
                {
                    path: 'lastAppointment',
                    populate: { path: 'doctor', select: 'fullName specialty' }
                },
                {
                    path: 'nextAppointment',
                    populate: { path: 'doctor', select: 'fullName specialty' }
                }
            ]
        };

        const appointments = await Appointment.find(filter)
            .populate({ path: 'doctor', select: 'fullName specialty' })
            .populate(populatePatient)
            .lean();

        const calendarEvents = appointments.map(appointment => {
            // Cria objeto Date completo combinando date e time
            const dateOnly = appointment.date ? new Date(appointment.date) : new Date();
            const [hours, minutes] = appointment.time.split(':').map(Number);

            const startDate = new Date(
                dateOnly.getFullYear(),
                dateOnly.getMonth(),
                dateOnly.getDate(),
                hours,
                minutes
            );

            if (isNaN(startDate.getTime())) {
                console.error('Data inválida para agendamento:', appointment._id);
                return null;
            }

            const duration = appointment.duration || 40;
            const endDate = new Date(startDate.getTime() + duration * 60000);

            return {
                id: appointment._id.toString(),
                title: `${appointment.reason || 'Consulta'} - ${appointment.doctor?.fullName || 'Médico'}`,
                start: startDate.toISOString(),
                end: endDate.toISOString(),

                // Mantém os campos separados conforme necessário
                date: appointment.date,  // Data completa como está no banco
                time: appointment.time,  // Horário no formato "HH:mm"

                status: appointment.status,
                specialty: appointment.specialty,
                description: appointment.reason,
                patient: appointment.patient ? {
                    id: appointment.patient._id.toString(),
                    fullName: appointment.patient.fullName,
                    dateOfBirth: appointment.patient.dateOfBirth,
                    gender: appointment.patient.gender,
                    phone: appointment.patient.phone,
                    email: appointment.patient.email,
                    cpf: appointment.patient.cpf,
                    rg: appointment.patient.rg,
                    address: appointment.patient.address,
                    appointments: appointment.patient.appointments || [],
                    lastAppointment: appointment.patient.lastAppointment,
                    nextAppointment: appointment.patient.nextAppointment,
                } : {},
                doctor: appointment.doctor ? {
                    id: appointment.doctor._id.toString(),
                    fullName: appointment.doctor.fullName,
                    specialty: appointment.doctor.specialty
                } : {},
                operationalStatus: appointment.operationalStatus,
                clinicalStatus: appointment.clinicalStatus,
                reason: appointment.reason
            };
        }).filter(Boolean);

        res.json(calendarEvents);

    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'O formato do ID fornecido é inválido'
            });
        }

        res.status(500).json({
            error: 'Erro interno',
            details: error.message
        });
    }
});


// Busca agendamentos por especialidade
router.get('/by-specialty/:specialty', auth, async (req, res) => {
    try {
        const { specialty } = req.params;
        const appointments = await Appointment.find({
            doctor: req.user._id,
            specialty
        }).populate('patient', 'fullName');

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualiza um agendamento com verificação de conflitos
router.put('/:id', validateId, auth, checkAppointmentConflicts, async (req, res) => {
    console.log(`[BACK] - PUT ATUALZIAR agednamento`, req)

    try {
        // 1. Buscar e validar agendamento
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        // 2. Verificar permissões
        if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }

        // 3. Preparar atualização
        const updateData = { ...req.body };

        // 4. Manter campos sensíveis se não fornecidos
        if (!updateData.specialty) updateData.specialty = appointment.specialty;
        if (!updateData.doctor) updateData.doctor = appointment.doctor;

        // 5. Atualizar com validação
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );

        res.json(updated);
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});

            return res.status(400).json({
                message: 'Falha na validação dos dados',
                errors
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'O formato do ID fornecido é inválido'
            });
        }

        res.status(500).json({
            error: 'Erro interno',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Deleta um agendamento
router.delete('/:id', validateId, auth, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Agendamento deletado com sucesso' });

        await updatePatientAppointments(req.body.patientId);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});

            return res.status(400).json({
                message: 'Falha na validação dos dados',
                errors
            });
        }

        return res.status(500).json({ error: 'Erro interno' });
    }
});

// Histórico de agendamentos por paciente
router.get('/history/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const history = await Appointment.find({ patientId }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});

            return res.status(400).json({
                message: 'Falha na validação dos dados',
                errors
            });
        }

        return res.status(500).json({ error: 'Erro interno' });
    }
});

// Cancela um agendamento
router.patch('/:id/cancel', validateId, auth, async (req, res) => {
    console.log(`[BACK] - CANCELAR agednamento`, req)

    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ error: 'O motivo do cancelamento é obrigatório' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        if (appointment.operationalStatus === 'cancelado') {
            return res.status(400).json({ error: 'Este agendamento já está cancelado' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                operationalStatus: 'cancelado',
                status: 'cancelado',
                canceledReason: reason,
                $push: {
                    history: {
                        action: 'cancelamento',
                        newStatus: 'cancelado',
                        changedBy: req.user._id,
                        timestamp: new Date(),
                        context: 'operacional',
                        details: { reason }
                    }
                }
            },
            { new: true }
        );

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Marca agendamento como concluído
router.patch('/:id/complete', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        if (appointment.operationalStatus === 'confirmado') {
            return res.status(400).json({ error: 'Este agendamento já está concluído' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            {
                operationalStatus: 'confirmado',
                $push: {
                    history: {
                        action: 'confirmado',
                        newStatus: 'confirmado',
                        changedBy: req.user._id,
                        timestamp: new Date(),
                        context: 'operacional',
                    }
                }
            },
            { new: true }
        );
        console.log(`completar agednamento`, appointment)

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao concluir agendamento:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Busca todos os agendamentos de um paciente
router.get('/patient/:id', validateId, auth, async (req, res) => {
    const patient = req.params.id;
    try {
        const appointments = await Appointment.find({ patient }).populate([
            { path: 'doctor', select: 'fullName crm' },
            { path: 'patient', select: 'fullName phone' },
            { path: 'payment' },
            { path: 'history.changedBy', select: 'name email role' }
        ]);


        res.json(appointments);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});

            return res.status(400).json({
                message: 'Falha na validação dos dados',
                errors
            });
        }

        return res.status(500).json({ error: 'Erro interno' });
    }
});

router.get('/count-by-status', auth, async (req, res) => {
    try {
        const { dateFrom, dateTo, specialty } = req.query;

        // FILTRO SEM MÉDICO (toda clínica)
        const filter = {};

        // Filtro de datas
        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom) filter.date.$gte = new Date(dateFrom);
            if (dateTo) {
                const end = new Date(dateTo);
                end.setHours(23, 59, 59, 999);
                filter.date.$lte = end;
            }
        }

        // Filtro de especialidade
        if (specialty && specialty !== 'all') {
            filter.specialty = specialty;
        }

        // Agregação
        const counts = await Appointment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$operationalStatus",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Formatar resultado
        const result = {
            agendado: 0,
            confirmado: 0,
            cancelado: 0,
            pago: 0,
            faltou: 0
        };

        counts.forEach(item => {
            if (result.hasOwnProperty(item._id)) {
                result[item._id] = item.count;
            }
        });

        return res.json({ success: true, data: result });

    } catch (error) {
        console.error('Erro na rota count-by-status:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// Nova rota para estatísticas completas
// Atualize a rota de estatísticas
router.get('/stats', auth, async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const doctor = new mongoose.Types.ObjectId(req.user._id);

        // Configuração das especialidades
        const specialtiesConfig = {
            'Terapia Ocupacional': {
                id: 'to',
                name: 'Terapia Ocupacional',
                icon: 'accessibility',
                color: '#9C27B0',
                sessionDuration: 40,
                price: 150.00 // Adicionado preço para cálculo de receita
            },
            'Psicologia': {
                id: 'psicologia',
                name: 'Psicologia',
                icon: 'psychology',
                color: '#3F51B5',
                sessionDuration: 40,
                price: 200.00
            },
            'Psiquiatria': {
                id: 'psiquiatria',
                name: 'Psiquiatria',
                icon: 'medical_services',
                color: '#009688',
                sessionDuration: 30,
                price: 300.00
            },
            'Fonoaudiologia': {
                id: 'fonoaudiologia',
                name: 'Fonoaudiologia',
                icon: 'AudioLines',
                color: '#FF9800',
                sessionDuration: 40,
                price: 180.00
            }
        };

        const stats = await Appointment.aggregate([
            { $match: { doctor } },
            {
                $facet: {
                    today: [
                        { $match: { date: { $gte: todayStart, $lte: todayEnd } } },
                        { $count: "count" }
                    ],
                    confirmed: [
                        { $match: { status: 'confirmado' } },
                        { $count: "count" }
                    ],
                    totalPatients: [
                        { $group: { _id: "$patientId" } },
                        { $count: "count" }
                    ],
                    bySpecialty: [
                        {
                            $group: {
                                _id: "$specialty",
                                scheduled: { $sum: 1 },
                                completed: {
                                    $sum: {
                                        $cond: [{ $eq: ["$operationalStatus", "concluído"] }, 1, 0]
                                    }
                                },
                                canceled: {
                                    $sum: {
                                        $cond: [{ $eq: ["$operationalStatus", "cancelado"] }, 1, 0]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]);

        const result = {
            today: stats[0]?.today[0]?.count || 0,
            confirmed: stats[0]?.confirmed[0]?.count || 0,
            totalPatients: stats[0]?.totalPatients[0]?.count || 0,
            specialties: []
        };

        const specialtyStats = stats[0]?.bySpecialty || [];

        for (const [name, config] of Object.entries(specialtiesConfig)) {
            const stat = specialtyStats.find(s => s._id === name) || {
                scheduled: 0,
                completed: 0,
                canceled: 0
            };

            const revenue = stat.completed * config.price;

            result.specialties.push({
                ...config,
                stats: {
                    scheduled: stat.scheduled || 0,
                    completed: stat.completed || 0,
                    canceled: stat.canceled || 0,
                    revenue: revenue || 0
                }
            });
        }

        res.json(result);

    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({
            error: 'Erro interno',
            details: error.message
        });
    }
});

// backend/controllers/appointmentController.js
router.patch('/:id/clinical-status', validateId, auth, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['em_andamento', 'concluído', 'faltou'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status clínico inválido' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }

        // Atualização segura que ignora validações problemáticas
        appointment.clinicalStatus = status;
        appointment.history.push({
            action: 'atualização_status_clínico',
            newStatus: status,
            changedBy: req.user._id,
            timestamp: new Date(),
            context: 'clínico'
        });

        if (status === 'concluído') {
            appointment.operationalStatus = 'pago';
        }

        // Salva sem validar campos problemáticos
        const updatedAppointment = await appointment.save({ validateBeforeSave: false });

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao atualizar status clínico:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

export default router;