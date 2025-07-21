import express from 'express';
import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';
import { auth, authorize } from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';


const router = express.Router();

router.post('/', async (req, res) => {
    const { patientId,
        doctorId, serviceType,
        amount, paymentMethod,
        status, notes, packageId,
        sessionId, isAdvancePayment = false,
        advanceSessions = []
    } = req.body;

    try {
        // Validação básica
        if (!patientId || !doctorId || !sessionType || !amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios faltando'
            });
        }

        if (isAdvancePayment) {
            return handleAdvancePayment(req, res);
        }

        // Cria sessão individual se necessário
        let individualSessionId = null;
        if (serviceType === 'individual_session') {
            const newSession = await Session.create({
                serviceType,
                patient: patientId,
                doctor: doctorId,
                notes,
                package: null
            });
            individualSessionId = newSession._id;
        }

        // Validação específica por tipo de serviço
        if (serviceType === 'package_session' && !packageId) {
            return res.status(400).json({
                success: false,
                message: 'ID do pacote é obrigatório para pagamentos de pacote'
            });
        }

        // Validação para sessões (exceto individual_session)
        if (serviceType === 'session' && !sessionId) {
            return res.status(400).json({
                success: false,
                message: 'ID da sessão é obrigatório para serviço do tipo "session"'
            });
        }

        // Validação de documentos relacionados
        if (serviceType === 'package_session') {
            const packageExists = await Package.exists({ _id: packageId });
            if (!packageExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Pacote não encontrado'
                });
            }
        }

        // Validação de sessão para tipo 'session' (individual_session não precisa)
        if (serviceType === 'session') {
            const sessionExists = await Session.exists({ _id: sessionId });
            if (!sessionExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Sessão não encontrada'
                });
            }
        }

        // Criar sessões futuras se for pagamento adiantado
        let advanceSessionsIds = [];
        if (advanceSessions.length > 0) {
            for (const session of advanceSessions) {
                const newSession = await Session.create({
                    date: session.date,
                    time: session.time,
                    sessionType: session.sessionType,
                    patient: patientId,
                    doctor: doctorId,
                    status: 'scheduled',
                    isPaid: true,
                    paymentMethod: paymentMethod,
                    isAdvance: true
                });
                advanceSessionsIds.push(newSession._id);
            }
        }

        // Criar pagamento com sessões futuras
        const paymentData = {
            patient: patientId,
            doctor: doctorId,
            serviceType,
            amount,
            paymentMethod,
            notes,
            status: status || 'paid',
            coveredSessions: advanceSessionsIds.map(id => ({
                sessionId: id,
                used: false,
                scheduledDate: advanceSessions.find(s => s.sessionId === id.toString())?.date
            })),
            isAdvance: advanceSessions.length > 0
        };

        // Adiciona campos condicionais
        if (serviceType === 'session') {
            paymentData.session = sessionId;
        } else if (serviceType === 'individual_session') {
            paymentData.session = individualSessionId;
        } else if (serviceType === 'package_session') {
            paymentData.package = packageId;
        }

        const payment = await Payment.create(paymentData);

        // Atualiza status da sessão para tipos relevantes
        if (serviceType === 'session' || serviceType === 'individual_session') {
            const sessionToUpdate = serviceType === 'individual_session' ? individualSessionId : sessionId;
            await Session.findByIdAndUpdate(
                sessionToUpdate,
                { status: status }
            );
        }

        return res.status(201).json({
            success: true,
            data: payment
        });

    } catch (error) {
        console.error('Erro ao registrar pagamento:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao registrar pagamento',
            error: error.message
        });
    }
});

// Função para lidar com pagamentos de sessões futuras
async function handleAdvancePayment(req, res) {
    const {
        patientId,
        doctorId,
        amount,
        paymentMethod,
        status,
        notes,
        advanceSessions = []
    } = req.body;

    try {
        // Validação específica para sessões futuras
        if (advanceSessions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'É necessário pelo menos uma sessão futura'
            });
        }

        // Validar cada sessão
        for (const session of advanceSessions) {
            if (!session.date || !session.time || !session.sessionType) {
                return res.status(400).json({
                    success: false,
                    message: 'Todas as sessões devem ter data, horário e tipo preenchidos'
                });
            }
        }

        // Criar sessões futuras
        const advanceSessionsIds = [];
        for (const session of advanceSessions) {
            const newSession = await Session.create({
                date: session.date,
                time: session.time,
                sessionType: session.sessionType,
                patient: patientId,
                doctor: doctorId,
                status: 'scheduled',
                isPaid: true,
                paymentMethod: paymentMethod,
                isAdvance: true
            });
            advanceSessionsIds.push(newSession._id);
        }

        // Criar pagamento
        const payment = await Payment.create({
            patient: patientId,
            doctor: doctorId,
            amount,
            paymentMethod,
            notes,
            status: status || 'paid',
            isAdvance: true,
            advanceSessions: advanceSessionsIds.map(id => ({
                sessionId: id,
                used: false,
                scheduledDate: advanceSessions.find(s => s.sessionId === id.toString())?.date
            }))
        });

        return res.status(201).json({
            success: true,
            data: payment
        });

    } catch (error) {
        console.error('Erro no pagamento adiantado:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao registrar pagamento adiantado',
            error: error.message
        });
    }
}

router.get('/', async (req, res) => {
    try {
        const { doctorId, patientId, status, startDate, endDate } = req.query;
        const filters = {};

        if (doctorId) filters.doctor = doctorId;
        if (patientId) filters.patient = patientId;
        if (status) filters.status = status;
        if (startDate && endDate) {
            filters.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const payments = await Payment.find(filters)
            .populate({
                path: 'patient',
                select: 'fullName email phoneNumber',
                model: 'Patient',
            })
            .populate({
                path: 'doctor',
                select: 'fullName specialty',
                model: 'Doctor',
            })
            .populate({
                path: 'package',
                select: 'name totalSessions',
                model: 'Package',
            })
            .populate({
                path: 'session',
                select: 'date status',
                model: 'Session',
            })
            .populate({
                path: 'appointment',
                select: 'date time status',
                model: 'Appointment',
            })
            .populate({
                path: 'advanceSessions.session',
                select: 'date time sessionType status',
                model: 'Session'
            })
            .sort({ createdAt: -1 })
            .lean();

        const validPayments = payments.filter(
            (p) => p.session?.status !== 'canceled'
        );

        if (validPayments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Nenhum pagamento encontrado',
            });
        }

        const totalReceived = validPayments.reduce((acc, p) => {
            return p.status === 'paid' ? acc + p.amount : acc;
        }, 0);

        const totalPending = validPayments.reduce((acc, p) => {
            return p.status === 'pending' ? acc + p.amount : acc;
        }, 0);

        const formattedPayments = validPayments.map((payment) => ({
            ...payment,
            patientName: payment.patient?.fullName || 'Não informado',
            doctorName: payment.doctor?.fullName || 'Não informado',
            doctorSpecialty: payment.doctor?.specialty || 'Não informada',
            packageName: payment.package?.name || null,
            formattedDate: new Date(payment.createdAt).toLocaleDateString('pt-BR'),
            formattedAmount: `R$ ${payment.amount.toFixed(2)}`,
            advanceSessions: payment.advanceSessions?.map(s => ({
                sessionId: s.session?._id,
                date: s.session?.date,
                time: s.session?.time,
                sessionType: s.session?.sessionType,
                status: s.session?.status,
                used: s.used
            })) || []
        }));

        return res.status(200).json({
            success: true,
            count: formattedPayments.length,
            data: formattedPayments,
            totals: {
                received: totalReceived,
                pending: totalPending,
            },
        });
    } catch (err) {
        console.error('Erro ao buscar pagamentos:', err);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar pagamentos',
            error:
                process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, paymentMethod, status, advanceSessions = [] } = req.body;
        const mongoSession = await mongoose.startSession();
        await mongoSession.startTransaction();

        try {
            // 1. Buscar e atualizar pagamento
            let payment = await Payment.findById(id).session(mongoSession);
            if (!payment) {
                await mongoSession.abortTransaction();
                return res.status(404).json({ error: 'Pagamento não encontrado' });
            }

            // Atualizar campos básicos
            if (amount !== undefined) payment.amount = amount;
            if (paymentMethod !== undefined) payment.paymentMethod = paymentMethod;
            if (status !== undefined) payment.status = status;

            // 2. Processar sessões futuras (se existirem)
            if (advanceSessions.length > 0) {
                payment.advanceSessions = payment.advanceSessions || [];
                payment.isAdvance = true;

                for (const sessionData of advanceSessions) {
                    // Criar Appointment
                    const newAppointment = new Appointment({
                        date: sessionData.date,
                        time: sessionData.time,
                        patient: payment.patient,
                        doctor: payment.doctor,
                        specialty: sessionData.sessionType,
                        serviceType: 'individual_session',
                        operationalStatus: 'agendado',
                        clinicalStatus: 'pendente',
                        paymentStatus: status === 'paid' ? 'paid' : 'pending',
                        paymentMethod: paymentMethod || payment.paymentMethod,
                        sessionValue: sessionData.amount || payment.amount
                    });
                    await newAppointment.save({ session: mongoSession });

                    // Criar Session
                    const newSession = new Session({
                        date: sessionData.date,
                        time: sessionData.time,
                        sessionType: sessionData.sessionType,
                        sessionValue: sessionData.amount || payment.amount,
                        patient: payment.patient,
                        doctor: payment.doctor,
                        status: status === 'paid' ? 'scheduled' : 'pending',
                        isPaid: status === 'paid',
                        paymentMethod: paymentMethod || payment.paymentMethod,
                        isAdvance: true,
                        appointment: newAppointment._id
                    });
                    await newSession.save({ session: mongoSession });

                    // Atualizar Appointment com referência da Session
                    newAppointment.session = newSession._id;
                    await newAppointment.save({ session: mongoSession });

                    // Adicionar ao pagamento
                    payment.advanceSessions.push({
                        session: newSession._id,
                        appointment: newAppointment._id,
                        used: false,
                        scheduledDate: sessionData.date
                    });
                }
            }

            // Salvar atualizações do pagamento
            await payment.save({ session: mongoSession });

            // 3. Lógica existente para pacotes
            if (payment.package) {
                await Session.updateMany(
                    { package: payment.package },
                    {
                        $set: {
                            isPaid: true,
                            status: 'completed'
                        }
                    },
                    { session: mongoSession }
                );
                await updatePackageStatus(payment.package, mongoSession);
            }
            // 4. Lógica existente para sessão individual
            else if (payment.session) {
                await Session.findByIdAndUpdate(
                    payment.session,
                    {
                        isPaid: status === 'paid',
                        status: status === 'paid' ? 'completed' : 'pending'
                    },
                    { session: mongoSession }
                );
            }

            // 5. Atualizar status em agendamentos vinculados
            await Appointment.updateMany(
                {
                    $or: [
                        { payment: id },
                        { _id: { $in: payment.advanceSessions?.map(a => a.appointment) } }
                    ]
                },
                {
                    $set: {
                        paymentStatus: status === 'paid' ? 'paid' : 'pending',
                        operationalStatus: status === 'paid' ? 'confirmado' : 'pendente'
                    }
                },
                { session: mongoSession }
            );

            await mongoSession.commitTransaction();

            // Recarregar o pagamento com as relações populadas
            const updatedPayment = await Payment.findById(id)
                .populate('patient doctor session')
                .populate({
                    path: 'advanceSessions.session',
                    model: 'Session',
                    populate: {
                        path: 'appointment',
                        model: 'Appointment'
                    }
                })
                .populate({
                    path: 'advanceSessions.appointment',
                    model: 'Appointment'
                });

            res.json(updatedPayment);

        } catch (error) {
            await mongoSession.abortTransaction();
            console.error('Erro durante a transação:', error);
            throw error;
        } finally {
            await mongoSession.endSession();
        }

    } catch (err) {
        console.error('Erro ao atualizar pagamento:', err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Erro de validação',
                errors: err.errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno ao atualizar pagamento',
            error: err.message
        });
    }
});

// Função para atualizar status do pacote
async function updatePackageStatus(packageId) {
    const packageDoc = await Package.findById(packageId).populate('sessions');
    const remaining = packageDoc.totalSessions - packageDoc.sessions.length;

    await Package.findByIdAndUpdate(
        packageId,
        { remainingSessions: Math.max(0, remaining) }
    );
}

router.get('/future-sessions/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const sessions = await Session.find({
            patient: patientId,
            isAdvance: true,
            status: 'scheduled'
        })
            .populate('doctor', 'fullName specialty')
            .select('date time sessionType specialty')
            .sort({ date: 1 });

        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/use-session/:paymentId', async (req, res) => {
    const { sessionId } = req.body;

    try {
        const payment = await Payment.findById(req.params.paymentId);

        // Encontrar a sessão específica
        const session = payment.sessions.id(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Sessão não encontrada neste pagamento' });
        }

        if (session.status === 'completed') {
            return res.status(400).json({ error: 'Sessão já foi utilizada' });
        }

        // Atualizar status
        session.status = 'completed';
        session.usedAt = new Date();

        await payment.save();

        res.json({
            success: true,
            message: 'Sessão marcada como utilizada',
            updatedPayment: payment
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:paymentId/add-session', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { date, time, sessionType, specialty } = req.body;
        const payment = await Payment.findById(req.params.paymentId).session(session);

        if (!payment) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }

        if (!payment.isAdvancePayment) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Este pagamento não permite sessões futuras' });
        }

        // Criar novo agendamento
        const appointment = new Appointment({
            date,
            time,
            sessionType,
            specialty,
            patient: payment.patient,
            doctor: payment.doctor,
            paymentStatus: 'advanced',
            sourcePayment: payment._id,
            operationalStatus: 'agendado',
            clinicalStatus: 'pendente'
        });

        // Criar nova sessão
        const newSession = new Session({
            date,
            time,
            sessionType,
            specialty,
            patient: payment.patient,
            doctor: payment.doctor,
            status: 'scheduled',
            sourcePayment: payment._id
        });

        // Salvar ambos
        await appointment.save({ session });
        await newSession.save({ session });

        // Adicionar ao pagamento
        payment.advancedSessions.push({
            appointment: appointment._id,
            session: newSession._id,
            scheduledDate: new Date(`${date}T${time}`),
            used: false
        });

        await payment.save({ session });
        await session.commitTransaction();

        res.json({
            success: true,
            payment,
            newAppointment: appointment,
            newSession: newSession
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Erro ao adicionar sessão futura:', error);
        res.status(500).json({
            error: 'Erro ao adicionar sessão futura',
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    } finally {
        session.endSession();
    }
});

// Funções auxiliares
async function updateSessionStatus(sessionId, amountPaid) {
    const session = await Session.findById(sessionId);
    if (!session) return;

    if (amountPaid >= session.price) {
        session.status = 'paid';
    } else if (amountPaid > 0) {
        session.status = 'partial';
    } else {
        session.status = 'pending';
    }
    await session.save();
}

// Função para atualizar status do pacote (com suporte a transação)

// Função para atualizar status do pacote (considerando sessões usadas)
// Exportação de PDF
router.get('/export/pdf', authorize(['admin']), async (req, res) => {
    try {
        const filters = req.query;
        const payments = await Payment.find(filters)
            .populate('patientId doctorId sessionId packageId')
            .sort({ sessionDate: 1 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_pagamentos.pdf');

        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        doc.pipe(res);

        doc.fontSize(18).text('Relatório de Pagamentos', { align: 'center' });
        doc.moveDown(1);

        doc.fontSize(12);
        doc.text('Data', 50, doc.y, { width: 80, continued: true });
        doc.text('Paciente', 130, doc.y, { width: 120, continued: true });
        doc.text('Profissional', 250, doc.y, { width: 120, continued: true });
        doc.text('Valor', 370, doc.y, { width: 60, continued: true });
        doc.text('Status', 430, doc.y, { width: 80 });
        doc.text('Pacote', 510, doc.y, { width: 80 });
        doc.moveDown(0.5);

        payments.forEach(p => {
            const date = p.sessionDate.toISOString().split('T')[0];
            doc.text(date, 50, doc.y, { width: 80, continued: true });
            doc.text(p.patientId.name, 130, doc.y, { width: 120, continued: true });
            doc.text(p.doctorId.name, 250, doc.y, { width: 120, continued: true });
            doc.text(`R$ ${p.value.toFixed(2)}`, 370, doc.y, { width: 60, continued: true });
            doc.text(p.status.toUpperCase(), 430, doc.y, { width: 80 });
            doc.text(p.packageId.name, 510, doc.y, { width: 80 });
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        console.error('Erro ao gerar PDF', err);
        res.status(500).json({ message: 'Erro ao gerar PDF' });
    }
});

// Exportação CSV
router.get('/export/csv', authorize(['admin', 'secretary']), async (req, res) => {
    const filters = req.query;
    const payments = await Payment.find(filters)
        .populate('patientId doctorId')
        .sort({ sessionDate: 1 });

    const headers = ['Data', 'Paciente', 'Profissional', 'Valor', 'Status', 'Método'];
    const rows = payments.map(p => [
        p.sessionDate.toISOString().split('T')[0],
        p.patientId.name,
        p.doctorId.name,
        p.value.toFixed(2),
        p.status,
        p.paymentMethod
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

    res
        .header('Content-Type', 'text/csv')
        .attachment('pagamentos.csv')
        .send(csv);
});

// routes/paymentRoutes.js
router.get('/totals', async (req, res) => {
    try {
        const { doctorId, startDate, endDate } = req.query;

        const matchStage = {};
        if (doctorId) matchStage.doctor = mongoose.Types.ObjectId(doctorId);
        if (startDate && endDate) {
            matchStage.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const aggregation = [
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalReceived: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0]
                        }
                    },
                    totalPending: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0]
                        }
                    },
                    countReceived: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, 1, 0]
                        }
                    },
                    countPending: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                        }
                    }
                }
            }
        ];

        const result = await Payment.aggregate(aggregation);

        const totals = result[0] || {
            totalReceived: 0,
            totalPending: 0,
            countReceived: 0,
            countPending: 0
        };

        res.status(200).json({
            success: true,
            data: {
                totalReceived: totals.totalReceived,
                totalPending: totals.totalPending,
                countReceived: totals.countReceived,
                countPending: totals.countPending
            }
        });

    } catch (err) {
        console.error('Erro ao calcular totais:', err);
        res.status(500).json({
            success: false,
            message: 'Erro ao calcular totais'
        });
    }
});

router.get('/daily-closing', async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date || new Date().toISOString().split('T')[0];
        const [year, month, day] = targetDate.split('-').map(Number);

        // 1. Ajuste de fuso horário (UTC-3)
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month - 1, day + 1, 2, 59, 59, 999));
        const displayDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

        // 2. Buscar dados em paralelo (otimizado)
        const [allSessions, allAppointments, allPayments, allDoctors] = await Promise.all([
            Session.find({ date: { $gte: startOfDay, $lte: endOfDay } })
                .populate('doctor patient package'),

            Appointment.find({ date: { $gte: startOfDay, $lte: endOfDay } })
                .populate('doctor patient session package'),

            Payment.find({
                createdAt: { $gte: startOfDay, $lte: endOfDay },
                status: 'paid' // CORREÇÃO: status correto
            }).populate('doctor patient'),

            Doctor.find().select('_id fullName specialty')
        ]);

        // 3. Classificação correta de eventos
        const events = [];

        // Processar sessões
        allSessions.forEach(session => {
            events.push({
                type: 'session',
                id: session._id,
                date: session.date,
                doctor: session.doctor,
                patient: session.patient,
                package: session.package,
                value: session.sessionValue,
                status: session.status,
                operationalStatus: session.isPaid ? 'pago' : 'pendente',
                clinicalStatus: session.status === 'completed' ? 'concluído' : 'pendente'
            });
        });

        // Processar agendamentos
        allAppointments.forEach(appt => {
            events.push({
                type: 'appointment',
                id: appt._id,
                date: appt.date,
                doctor: appt.doctor,
                patient: appt.patient,
                package: appt.package,
                value: appt.sessionValue,
                status: appt.operationalStatus,
                operationalStatus: appt.operationalStatus,
                clinicalStatus: appt.clinicalStatus
            });
        });

        // 4. Função para determinar valor do evento
        const getEventValue = (event) => {
            // Prioridade: valor direto > valor do pacote > valor padrão por especialidade
            if (event.value > 0) return event.value;

            if (event.package?.sessionValue > 0) {
                return event.package.sessionValue;
            }

            const specialtyValues = {
                'fonoaudiologia': 180,
                'psicologia': 200,
                'terapia ocupacional': 170,
                'fisioterapia': 160,
                'pediatria': 220,
                'neuroped': 250
            };

            return specialtyValues[event.sessionType] || 0;
        };

        // 5. Inicializar estrutura do relatório
        const report = {
            date: displayDate,
            period: { start: startOfDay.toISOString(), end: endOfDay.toISOString() },
            totals: {
                scheduled: { count: 0, value: 0 },
                completed: { count: 0, value: 0 },
                payments: { count: 0, value: 0, methods: { dinheiro: 0, pix: 0, cartão: 0 } },
                absences: { count: 0, estimatedLoss: 0 }
            },
            byProfessional: {}
        };

        // 6. Processar todos os eventos
        events.forEach(event => {
            const eventValue = getEventValue(event);

            // Total de agendados (TODOS os eventos)
            report.totals.scheduled.count++;
            report.totals.scheduled.value += eventValue;

            // Inicializar profissional se necessário
            const doctorId = event.doctor?._id.toString() || 'unknown';
            if (!report.byProfessional[doctorId]) {
                report.byProfessional[doctorId] = {
                    doctorId,
                    doctorName: event.doctor?.fullName || 'Desconhecido',
                    specialty: event.doctor?.specialty || '',
                    scheduled: 0,
                    scheduledValue: 0,
                    completed: 0,
                    completedValue: 0,
                    absences: 0,
                    payments: { total: 0, methods: { dinheiro: 0, pix: 0, cartão: 0 } }
                };
            }

            const profData = report.byProfessional[doctorId];
            profData.scheduled++;
            profData.scheduledValue += eventValue;

            // Eventos realizados (somente concluídos)
            if (event.clinicalStatus === 'concluído' || event.status === 'completed') {
                report.totals.completed.count++;
                report.totals.completed.value += eventValue;
                profData.completed++;
                profData.completedValue += eventValue;
            }

            // Faltas/cancelamentos
            if (['cancelado', 'faltou', 'canceled'].includes(event.operationalStatus)) {
                report.totals.absences.count++;
                report.totals.absences.estimatedLoss += eventValue; // PERDA REAL
                profData.absences++;
            }
        });

        // 7. Processar pagamentos
        allPayments.forEach(payment => {
            report.totals.payments.count++;
            report.totals.payments.value += payment.amount;

            const method = payment.paymentMethod || 'dinheiro';
            report.totals.payments.methods[method] += payment.amount;

            const doctorId = payment.doctor?._id.toString() || 'unknown';
            if (report.byProfessional[doctorId]) {
                const profData = report.byProfessional[doctorId];
                profData.payments.total += payment.amount;
                profData.payments.methods[method] += payment.amount;
            }
        });

        // 8. Converter para array e adicionar profissionais sem eventos
        report.byProfessional = allDoctors.map(doctor => {
            const doctorId = doctor._id.toString();
            return report.byProfessional[doctorId] || {
                doctorId,
                doctorName: doctor.fullName,
                specialty: doctor.specialty,
                scheduled: 0,
                scheduledValue: 0,
                completed: 0,
                completedValue: 0,
                absences: 0,
                payments: { total: 0, methods: { dinheiro: 0, pix: 0, cartão: 0 } }
            };
        });

        // 9. Auditoria detalhada

        res.json(report);

    } catch (error) {
        console.error('❌ Erro no fechamento diário:', error);
        res.status(500).json({
            error: 'Erro no fechamento diário',
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});

// Detalhamento de sessões agendadas
router.get('/daily-scheduled-details', async (req, res) => {
    try {
        const { date } = req.query;

        // Criar datas com o fuso horário UTC-3
        const startOfDay = date
            ? new Date(`${date}T00:00:00-03:00`)
            : new Date(new Date().setHours(0, 0, 0, 0) - 3 * 60 * 60 * 1000);

        const endOfDay = date
            ? new Date(`${date}T23:59:59.999-03:00`)
            : new Date(new Date().setHours(23, 59, 59, 999) - 3 * 60 * 60 * 1000);

        const sessions = await Session.find({
            date: { $gte: startOfDay, $lte: endOfDay },
            status: 'scheduled'
        })
            .populate({
                path: 'patient',
                select: 'fullName phone email'
            })
            .populate({
                path: 'doctor',
                select: 'fullName specialty'
            })
            .populate({
                path: 'package',
                select: 'sessionValue sessionType'
            })
            .select('date time status confirmedAbsence notes')
            .sort({ date: 1 })
            .lean();

        // Formatar dados para resposta
        const formattedSessions = sessions.map(session => ({
            id: session._id,
            date: session.date,
            time: session.time,
            patient: session.patient?.fullName || 'N/A',
            patientPhone: session.patient?.phone || '',
            patientEmail: session.patient?.email || '',
            doctor: session.doctor?.fullName || 'N/A',
            specialty: session.doctor?.specialty || 'N/A',
            sessionType: session.package?.sessionType || 'N/A',
            value: session.package?.sessionValue || 0,
            status: session.status,
            confirmedAbsence: session.confirmedAbsence || false,
            notes: session.notes || ''
        }));

        res.json(formattedSessions);
    } catch (error) {
        console.error('Erro ao obter detalhes de sessões agendadas:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// Detalhamento de sessões realizadas
router.get('/daily-completed-details', async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();

        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        startOfDay.setHours(startOfDay.getHours() + 3);

        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + 3);

        const sessions = await Session.find({
            date: { $gte: startOfDay, $lte: endOfDay },
            status: 'completed'
        })
            .populate({
                path: 'patient',
                select: 'fullName'
            })
            .populate({
                path: 'doctor',
                select: 'fullName specialty'
            })
            .populate({
                path: 'package',
                select: 'sessionValue sessionType'
            })
            .select('date time notes')
            .sort({ date: 1 }) // Ordenar por horário
            .lean();

        // Formatar dados para resposta
        const formattedSessions = sessions.map(session => ({
            id: session._id,
            date: session.date,
            time: session.time,
            patient: session.patient?.fullName || 'N/A',
            doctor: session.doctor?.fullName || 'N/A',
            specialty: session.doctor?.specialty || 'N/A',
            sessionType: session.package?.sessionType || 'N/A',
            value: session.package?.sessionValue || 0,
            duration: 40, // Duração fixa padrão
            notes: session.notes || ''
        }));

        res.json(formattedSessions);
    } catch (error) {
        console.error('Erro ao obter detalhes de sessões realizadas:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// Detalhamento de pagamentos
router.get('/daily-payments-details', async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();

        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        startOfDay.setHours(startOfDay.getHours() + 3);

        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + 3);

        const payments = await Payment.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            status: 'confirmed'
        })
            .populate({
                path: 'patient',
                select: 'fullName'
            })
            .populate({
                path: 'doctor',
                select: 'fullName specialty'
            })
            .populate({
                path: 'package',
                select: 'sessionType'
            })
            .select('amount paymentMethod notes createdAt')
            .sort({ createdAt: -1 }) // Mais recentes primeiro
            .lean();

        // Formatar dados para resposta
        const formattedPayments = payments.map(payment => ({
            id: payment._id,
            date: payment.createdAt,
            patient: payment.patient?.fullName || 'N/A',
            doctor: payment.doctor?.fullName || 'N/A',
            specialty: payment.doctor?.specialty || 'N/A',
            sessionType: payment.package?.sessionType || 'N/A',
            amount: payment.amount,
            paymentMethod: payment.paymentMethod,
            notes: payment.notes || ''
        }));

        res.json(formattedPayments);
    } catch (error) {
        console.error('Erro ao obter detalhes de pagamentos:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// Detalhamento de faltas e cancelamentos
router.get('/daily-absences-details', async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();

        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        startOfDay.setHours(startOfDay.getHours() + 3);

        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + 3);

        const absences = await Session.find({
            date: { $gte: startOfDay, $lte: endOfDay },
            status: 'canceled',
            confirmedAbsence: true // Apenas faltas confirmadas
        })
            .populate({
                path: 'patient',
                select: 'fullName phone'
            })
            .populate({
                path: 'doctor',
                select: 'fullName specialty'
            })
            .populate({
                path: 'package',
                select: 'sessionValue sessionType'
            })
            .select('date time confirmedAbsence notes')
            .sort({ date: 1 }) // Ordenar por horário
            .lean();

        // Formatar dados para resposta
        const formattedAbsences = absences.map(absence => ({
            id: absence._id,
            date: absence.date,
            time: absence.time,
            patient: absence.patient?.fullName || 'N/A',
            patientPhone: absence.patient?.phone || '',
            doctor: absence.doctor?.fullName || 'N/A',
            specialty: absence.doctor?.specialty || 'N/A',
            sessionType: absence.package?.sessionType || 'N/A',
            value: absence.package?.sessionValue || 0,
            confirmedAbsence: absence.confirmedAbsence || false,
            notes: absence.notes || ''
        }));

        res.json(formattedAbsences);
    } catch (error) {
        console.error('Erro ao obter detalhes de faltas:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

export default router;

