import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js';
import { checkPackageAvailability } from '../middleware/checkPackageAvailability.js';
import { checkAppointmentConflicts, getAvailableTimeSlots } from '../middleware/conflictDetection.js';
import validateId from '../middleware/validateId.js';
import { validateIndividualPayment } from '../middleware/validateIndividualPayment.js';
import Appointment from '../models/Appointment.js';
import Package from '../models/Package.js';
import Patient from '../models/Patient.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';
import { syncEvent } from '../services/syncService.js';
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
router.post('/', auth, checkPackageAvailability, validateIndividualPayment, checkAppointmentConflicts, async (req, res) => {
    const mongoSession = await mongoose.startSession();
    await mongoSession.startTransaction();

    try {
        const doctorId = req.body.doctorId || req.user.id;

        // Verificação de permissões
        if (req.user.role === 'patient') {
            await mongoSession.abortTransaction();
            return res.status(403).json({ error: 'Acesso negado' });
        }

        // Buscar paciente
        const patient = await Patient.findById(req.body.patientId).session(mongoSession);
        if (!patient) {
            await mongoSession.abortTransaction();
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        // Verificar permissões do médico
        if (req.user.role === 'doctor' && patient.doctor && patient.doctor.toString() !== req.user.id) {
            await mongoSession.abortTransaction();
            return res.status(403).json({ error: 'Paciente não pertence ao seu consultório' });
        }

        // Se o paciente não tem médico, atribui o médico atual
        if (!patient.doctor) {
            patient.doctor = doctorId;
            await patient.save({ session: mongoSession });
        }

        let selectedPackage = null;
        // Verificar pacote APENAS se for serviço do tipo pacote
        if (req.body.serviceType === 'package') {
            selectedPackage = await Package.findById(req.body.packageId).session(mongoSession);

            // Bloqueia agendamento se não houver sessões disponíveis
            if (!selectedPackage || selectedPackage.remainingSessions <= 0) {
                await mongoSession.abortTransaction();
                return res.status(400).json({ error: 'Pacote sem sessões disponíveis' });
            }
        }

        const specialtyValue = req.body.specialty || patient.specialty;
        const validSpecialties = ['fonoaudiologia', 'psicologia', 'terapia_ocupacional', 'psicopedagogia'];

        if (!validSpecialties.includes(specialtyValue)) {
            // IMPORTANTE: Abortar transação ANTES de responder
            await mongoSession.abortTransaction();
            return res.status(400).json({
                error: 'Especialidade inválida',
                validSpecialties
            });
        }

        // Criar agendamento principal
        const appointmentData = {
            date: req.body.date,
            time: req.body.time,
            sessionType: req.body.sessionType,
            notes: req.body.notes,
            specialty: specialtyValue,
            doctor: doctorId,
            patient: patient._id,
            operationalStatus: 'agendado',
            clinicalStatus: 'pendente',
            serviceType: req.body.serviceType,
            paymentAmount: req.body.paymentAmount,
            paymentMethod: req.body.paymentMethod,
        };


        const appointment = new Appointment(appointmentData);
        await appointment.save({ session: mongoSession });

        let payment = null;
        const allAppointments = [appointment._id];

        // Criar pagamento APENAS para sessões individuais
        if (req.body.serviceType === 'individual_session') {
            payment = new Payment({
                amount: req.body.paymentAmount,
                method: req.body.paymentMethod,
                status: 'pending',
                patient: patient._id,
                doctor: doctorId,
                serviceType: 'individual_session',
                appointment: appointment._id,
                paymentMethod: req.body.paymentMethod,
            });

            await payment.save({ session: mongoSession });

            appointment.payment = payment._id;
            appointment.paymentStatus = 'pending';
            await appointment.save({ session: mongoSession });

            const session = await Session.create([{
                serviceType: 'individual_session',
                patient: patient._id,
                doctor: doctorId,
                appointment: appointment._id,
                payment: payment._id,
                sessionType: req.body.sessionType,
                date: req.body.date,
                time: req.body.time,
                notes: req.body.notes,
                status: 'scheduled',
                isPaid: true,
                paymentMethod: req.body.paymentMethod,
            }], { session: mongoSession });

            payment.session = session[0]._id;
            await payment.save({ session: mongoSession });
        }

        // Atualizar pacote se for serviço de pacote
        else if (req.body.serviceType === 'package_session') {
            if (appointment.package && appointment.package.remainingSessions > 0) {
                selectedPackage.remainingSessions -= 1;
                selectedPackage.sessions.push(appointment._id);
                await selectedPackage.save({ session: mongoSession });
                appointment.package = selectedPackage._id;
                appointment.paymentStatus = 'package_paid';
            }

        }

        await appointment.save({ session: mongoSession });



        // ATUALIZAÇÃO DO PACIENTE DE FORMA SEGURA
        await Patient.findByIdAndUpdate(
            patient._id,
            { $push: { appointments: appointment._id } },
            { session: mongoSession }
        );
        await patient.save({ session: mongoSession });
        await mongoSession.commitTransaction();

        await updatePatientAppointments(patient._id);


        try {
            await updatePatientAppointments(patient._id);

            await syncEvent(appointment, 'appointment');
            if (payment) await syncEvent(payment, 'payment');
        } catch (syncError) {
            console.error('Erro em operações pós-transação:', syncError);
        }


        res.status(201).json({
            appointment,
            paymentId: payment?._id,
            packageRemainingSessions: selectedPackage?.remainingSessions
        });

    } catch (error) {
        await mongoSession.abortTransaction();
        console.error('Erro completo:', error);

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
    } finally {
        await mongoSession.endSession();
    }
});
// Busca agendamentos com filtros
router.get('/', auth, async (req, res) => {

    try {
        const { patientId, doctorId, status, specialty, startDate, endDate } = req.query;
        const filter = {};

        // Construir filtros
        if (patientId && patientId !== 'all' && mongoose.Types.ObjectId.isValid(patientId)) {
            filter.patient = new mongoose.Types.ObjectId(patientId);
        }

        if (doctorId && doctorId !== 'all' && mongoose.Types.ObjectId.isValid(doctorId)) {
            filter.doctor = new mongoose.Types.ObjectId(doctorId);
        }

        if (status && status !== 'all') filter.status = status;
        if (specialty && specialty !== 'all') filter.specialty = specialty;

        // Adicionar filtro por período (novo)
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const appointments = await Appointment.find(filter)
            .populate({ path: 'doctor', select: 'fullName specialty' })
            .populate({
                path: 'patient',
                select: 'fullName dateOfBirth gender phone email address'
            })
            .sort({ date: 1 }) // Ordenar por data
            .lean();

        const calendarEvents = appointments.map(appt => {
            if (!appt.patient) return null;

            // Calcular datas de início/fim
            const [hours, minutes] = appt.time.split(':').map(Number);
            const startDate = new Date(appt.date);
            startDate.setHours(hours, minutes);
            const endDate = new Date(startDate.getTime() + (appt.duration || 40) * 60000);

            return {
                id: appt._id.toString(),
                title: `${appt.reason || 'Consulta'} - ${appt.doctor?.fullName || 'Profissional'}`,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                date: appt.date,
                time: appt.time,
                status: appt.status,
                specialty: appt.specialty,
                description: appt.reason,
                patient: appt.patient ? {
                    id: appt.patient._id.toString(),
                    fullName: appt.patient.fullName,
                    dateOfBirth: appt.patient.dateOfBirth,
                    gender: appt.patient.gender,
                    phone: appt.patient.phone,
                    email: appt.patient.email,
                    cpf: appt.patient.cpf,
                    rg: appt.patient.rg,
                    address: appt.patient.address,
                    appointments: appt.patient.appointments || [],
                    lastAppointment: appt.patient.lastAppointment,
                    nextAppointment: appt.patient.nextAppointment,
                } : {},
                doctor: appt.doctor ? {
                    id: appt.doctor._id.toString(),
                    fullName: appt.doctor.fullName,
                    specialty: appt.doctor.specialty
                } : {},
                operationalStatus: appt.operationalStatus,
                clinicalStatus: appt.clinicalStatus,
                reason: appt.reason
            };
        }).filter(event => event !== null);

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
router.put('/:id', validateId, auth, checkPackageAvailability,
    validateIndividualPayment, checkAppointmentConflicts, async (req, res) => {

        const mongoSession = await mongoose.startSession();

        try {
            await mongoSession.startTransaction();

            // 1. Buscar e validar agendamento com lock
            const appointment = await Appointment.findOneAndUpdate(
                { _id: req.params.id },
                { $set: {} }, // Operação vazia apenas para travar o documento
                { new: true, session: mongoSession }
            );

            if (!appointment) {
                await mongoSession.abortTransaction();
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }

            // 2. Verificar permissões
            if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
                await mongoSession.abortTransaction();
                return res.status(403).json({ error: 'Acesso não autorizado' });
            }

            // 3. Aplicar atualizações manualmente
            const updateData = { ...req.body };

            // Atualizar campos individualmente
            Object.keys(updateData).forEach(key => {
                if (key !== '_id' && key !== '__v') {
                    appointment[key] = updateData[key];
                }
            });

            // 4. Validar antes de salvar
            await appointment.validate();

            // 5. Salvar as alterações
            const updated = await appointment.save({ session: mongoSession });

            // 6. Tratamento especial para mudanças de pacote
            if (updateData.serviceType === 'package_session' && updateData.packageId) {
                // Verificar e atualizar pacote
                const newPackage = await Package.findById(updateData.packageId).session(mongoSession);

                if (!newPackage || newPackage.remainingSessions <= 0) {
                    await mongoSession.abortTransaction();
                    return res.status(400).json({ error: 'Pacote inválido ou sem sessões disponíveis' });
                }

                // Remover do pacote anterior (se existir)
                if (appointment.package) {
                    const oldPackage = await Package.findById(appointment.package).session(mongoSession);
                    if (oldPackage) {
                        oldPackage.remainingSessions += 1;
                        await oldPackage.save({ session: mongoSession });
                    }
                }

                // Adicionar ao novo pacote
                newPackage.remainingSessions -= 1;
                newPackage.sessions.push(updated._id);
                await newPackage.save({ session: mongoSession });
            }

            // 7. Commit da transação
            await mongoSession.commitTransaction();

            // 8. Sincronização assíncrona (fora da transação)
            setTimeout(() => {
                syncEvent(updated, 'appointment')
                    .catch(err => console.error('Erro na sincronização:', err));
            }, 100);

            res.json(updated);
        } catch (error) {
            console.error('Erro ao atualizar agendamento:', error);

            // Abortar transação se ainda estiver ativa
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }

            // Tratamento de erros
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).reduce((acc, err) => {
                    acc[err.path] = err.message;
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

            if (error.message === 'Pacote inválido ou sem sessões disponíveis') {
                return res.status(400).json({ error: error.message });
            }

            res.status(500).json({
                error: 'Erro interno',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        } finally {
            await mongoSession.endSession();
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

        // Popula mais dados necessários
        const appointment = await Appointment.findById(id)
            .populate('session package patient doctor')
            .populate({
                path: 'package',
            });

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        if (appointment.operationalStatus === 'confirmado') {
            return res.status(400).json({ error: 'Este agendamento já está concluído' });
        }

        // FLUXO DE PAGAMENTO AUTOMÁTICO
        let paymentRecord = null;

        // 1. Sessão avulsa (individual)
        if (!appointment.package && !appointment.session) {
            // Obter valor da sessão com fallbacks seguros
            const sessionValue = appointment.sessionValue ||
                (appointment.package?.sessionValue) ||
                200; // Valor padrão

            paymentRecord = new Payment({
                patient: appointment.patient._id,
                doctor: appointment.doctor._id,
                serviceType: 'individual_session',
                amount: sessionValue,
                paymentMethod: appointment.paymentMethod || 'dinheiro', // Usar método do agendamento se existir
                status: 'paid',
                appointment: appointment._id,
                notes: 'Pagamento automático por conclusão de sessão avulsa'
            });
            await paymentRecord.save();
        }

        // 2. Sessão de pacote
        if (appointment.session) {
            // Atualizar sessão do pacote
            await Session.findByIdAndUpdate(
                appointment.session._id,
                { status: 'completed' }
            );

            // Atualizar contagem no pacote
            if (appointment.package) {
                await Package.findByIdAndUpdate(
                    appointment.package._id,
                    { $inc: { sessionsDone: 1 } }
                );
            }
        }

        // Atualizar agendamento
        const updateData = {
            operationalStatus: 'confirmado',
            clinicalStatus: 'concluído',
            $push: {
                history: {
                    action: 'confirmado',
                    newStatus: 'confirmado',
                    changedBy: req.user._id,
                    timestamp: new Date(),
                    context: 'operacional',
                }
            }
        };

        // Vincular pagamento se existir
        if (paymentRecord) {
            updateData.payment = paymentRecord._id;
            updateData.paymentStatus = 'paid';
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // Sincronizar eventos após atualização
        try {
            await syncEvent(updatedAppointment, 'appointment');
            if (paymentRecord) {
                await syncEvent(paymentRecord, 'payment');
            }
        } catch (syncError) {
            console.error('Erro na sincronização pós-conclusão:', syncError);
        }

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao concluir agendamento:', error);
        res.status(500).json({
            error: 'Erro interno no servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
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
            {
                path: 'advancedSessions', // Nome correto do campo
                select: 'date time specialty operationalStatus clinicalStatus',
                populate: {
                    path: 'doctor',
                    select: 'fullName specialty'
                }
            },
            {
                path: 'history.changedBy',
                select: 'name email role',
                options: { retainNullValues: true },
            },
            {
                path: 'package',
                select: 'sessionType durationMonths sessionsPerWeek',
                populate: {
                    path: 'sessions',
                    select: 'date status isPaid'
                }
            },
            {
                path: 'session',
                select: 'date status isPaid confirmedAbsence',
                populate: {
                    path: 'package',
                    select: 'sessionType durationMonths sessionsPerWeek'
                }
            }
        ]).lean();

        const formattedAppointments = appointments.map(appt => {
            // Formatar sessões adiantadas
            if (appt.advancedSessions) {
                appt.advancedSessions = appt.advancedSessions.map(session => ({
                    ...session,
                    formattedDate: new Date(session.date).toLocaleDateString('pt-BR'),
                    formattedTime: session.time,
                }));
            }

            return {
                ...appt,
                paymentStatus: appt.package ? 'paid' : appt.paymentStatus,
                source: appt.package ? 'package' : 'individual'
            };
        });


        res.json(formattedAppointments);
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
                price: 200.00 // Adicionado preço para cálculo de receita
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