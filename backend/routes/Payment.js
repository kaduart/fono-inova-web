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
    const { id } = req.params;
    const { amount, paymentMethod, status, advanceSessions = [] } = req.body;
    const MAX_RETRIES = 8;  // Aumentamos para 8 tentativas
    let retryCount = 0;
    let result;

    // Função para executar operações críticas com tratamento especial
    const executeCriticalOperation = async (operation, session, entity, filter, update) => {
        try {
            return await operation(entity, filter, update, { session });
        } catch (error) {
            if (error.code === 112 || error.codeName === 'WriteConflict') {
                console.warn('Conflito detectado em operação crítica. Tentando abordagem alternativa...');

                // Abordagem alternativa: operação individual
                if (filter._id) {
                    // Se for uma operação em documento único
                    return await operation(entity, filter, update, { session });
                } else {
                    // Se for operação em múltiplos documentos, fazemos um a um
                    const docs = await entity.find(filter).session(session);
                    for (const doc of docs) {
                        await operation(entity, { _id: doc._id }, update, { session });
                    }
                    return { modifiedCount: docs.length };
                }
            }
            throw error;
        }
    };

    while (retryCount < MAX_RETRIES) {
        const mongoSession = await mongoose.startSession();

        try {
            await mongoSession.startTransaction({
                readConcern: { level: "snapshot" },
                writeConcern: { w: "majority", wtimeout: 10000 } // 10 segundos de timeout
            });


            // 1. Buscar e atualizar pagamento com lock explícito
            let payment = await Payment.findById(id)
                .session(mongoSession)
                .select()
                .lean(); // Usar lean para melhor performance

            if (!payment) {
                await mongoSession.abortTransaction();
                return res.status(404).json({ error: 'Pagamento não encontrado' });
            }

            // Atualizar campos básicos
            const updateData = {
                ...(amount !== undefined && { amount }),
                ...(paymentMethod !== undefined && { paymentMethod }),
                ...(status !== undefined && { status })
            };

            // Atualização direta para evitar conflitos
            await Payment.updateOne({ _id: id }, { $set: updateData }, { session: mongoSession });

            // 2. Processar sessões futuras (se existirem)
            if (advanceSessions.length > 0) {
                const advanceSessionsData = [];

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
                        status: status === 'paid' ? 'completed' : 'pending',
                        isPaid: status === 'paid',
                        paymentMethod: paymentMethod || payment.paymentMethod,
                        isAdvance: true,
                        appointment: newAppointment._id
                    });
                    await newSession.save({ session: mongoSession });

                    // Atualizar Appointment com referência da Session
                    await Appointment.updateOne(
                        { _id: newAppointment._id },
                        { $set: { session: newSession._id } },
                        { session: mongoSession }
                    );

                    // Adicionar ao pagamento
                    advanceSessionsData.push({
                        session: newSession._id,
                        appointment: newAppointment._id,
                        used: false,
                        scheduledDate: sessionData.date
                    });
                }

                // Atualizar pagamento com novas sessões
                await Payment.updateOne(
                    { _id: id },
                    {
                        $set: { isAdvance: true },
                        $push: { advanceSessions: { $each: advanceSessionsData } }
                    },
                    { session: mongoSession }
                );
            }

            // 3. Lógica existente para pacotes com tratamento especial
            if (payment.package) {
                await executeCriticalOperation(
                    Session.updateMany.bind(Session),
                    mongoSession,
                    Session,
                    { package: payment.package },
                    { $set: { isPaid: true, status: 'completed' } }
                );

                await updatePackageStatus(payment.package, mongoSession);
            }

            // 4. Lógica existente para sessão individual com tratamento especial
            if (payment.session) {
                Session.findByIdAndUpdate.bind(Session),
                    mongoSession,
                    Session,
                    { _id: payment.session },
                {
                    $set: {
                        isPaid: status === 'paid',
                        status: status === 'paid' ? 'completed' : 'pending'
                    }
                }
            }

            // 5. Atualizar status em agendamentos vinculados com tratamento especial
            const appointmentIds = [
                ...(payment.advanceSessions?.map(a => a.appointment) || []),
                ...(advanceSessions.map(s => s.appointmentId) || [])
            ].filter(id => id);

            if (appointmentIds.length > 0) {
                await executeCriticalOperation(
                    Appointment.updateMany.bind(Appointment),
                    mongoSession,
                    Appointment,
                    { _id: { $in: appointmentIds } },
                    {
                        $set: {
                            paymentStatus: status === 'paid' ? 'paid' : 'pending',
                            operationalStatus: status === 'paid' ? 'confirmado' : 'pendente'
                        }
                    }
                );
            }

            await mongoSession.commitTransaction();

            // Recarregar o pagamento com as relações populadas
            result = await Payment.findById(id)
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

            // Retornar resultado e sair do loop
            return res.json(result);

        } catch (error) {
            const isWriteConflict = error.code === 112 ||
                error.codeName === 'WriteConflict' ||
                (error.errorLabels && error.errorLabels.includes('TransientTransactionError'));

            if (isWriteConflict && retryCount < MAX_RETRIES - 1) {
                retryCount++;
                const delay = 150 * Math.pow(4, retryCount); // Backoff mais agressivo: 600, 2400, 9600ms
                console.warn(`Conflito detectado. Tentando novamente em ${delay}ms (${retryCount}/${MAX_RETRIES})`);

                if (mongoSession.inTransaction()) {
                    await mongoSession.abortTransaction();
                }

                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            // Tratamento de erros
            console.error('Erro durante a transação:', error);
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }

            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Erro de validação',
                    errors: error.errors
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Erro interno ao atualizar pagamento',
                error: error.message
            });

        } finally {
            await mongoSession.endSession();
        }
    }

    // Se chegou aqui após todas as tentativas sem sucesso
    console.error(`Falha após ${MAX_RETRIES} tentativas para atualizar pagamento ${id}`);
    return res.status(500).json({
        success: false,
        message: 'Falha após múltiplas tentativas',
        error: 'Não foi possível completar a operação devido a conflitos repetidos'
    });
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

        // Define o período do "dia" considerando horário Brasília (UTC-3)
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));  // 03:00 UTC início
        const endOfDay = new Date(Date.UTC(year, month - 1, day + 1, 2, 59, 59, 999)); // 02:59:59 próximo dia
        const displayDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

        // Buscar agendamentos do dia com dados essenciais
        const allAppointments = await Appointment.find({ date: { $gte: startOfDay, $lte: endOfDay } })
            .populate('doctor package patient payment')
            .lean();

        // IDs únicos de pacotes usados nos agendamentos
        const packageIds = [...new Set(
            allAppointments
                .filter(a => a.package)
                .map(a => {
                    // Se for string, use direto
                    if (typeof a.package === 'string') return a.package;

                    // Se for objeto populado, pegue o _id
                    if (a.package._id) return a.package._id.toString();

                    // fallback, tenta converter para string
                    if (a.package.toString) return a.package.toString();

                    return null;
                })
        )].filter(id => id !== null);

        // Buscar pacotes relacionados
        const allPackages = await Package.find({ _id: { $in: packageIds } }).lean();

        // Buscar todos os médicos
        const allDoctors = await Doctor.find().select('_id fullName specialty').lean();

        // Função para normalizar método de pagamento
        function normalizePaymentMethod(method) {
            if (!method || typeof method !== 'string') return 'dinheiro';
            console.log('method', method)
            const normalized = method.trim().toLowerCase();

            if (normalized.includes('pix')) return 'pix';
            if (normalized.includes('cartao') || normalized.includes('cartão') || normalized.includes('card')) return 'cartão';
            if (normalized.includes('dinheiro') || normalized.includes('cash')) return 'dinheiro';

            return 'dinheiro'; // fallback seguro
        }


        // Inicializa objeto resumo de pagamentos do dia
        const paymentsSummary = {
            count: 0,
            value: 0,
            methods: { dinheiro: 0, pix: 0, cartão: 0 }
        };

        // Set para contar pacientes únicos concluídos
        const uniquePatientIds = new Set();

        // Inicia o relatório com totais e agrupamentos
        const report = {
            date: displayDate,
            period: { start: startOfDay.toISOString(), end: endOfDay.toISOString() },
            totals: {
                scheduled: { count: 0, value: 0 },
                completed: { count: 0, value: 0 },
                payments: paymentsSummary,
                absences: { count: 0, estimatedLoss: 0 },
                canceled: { count: 0, value: 0 },
                uniquePatients: 0
            },
            byProfessional: {},
            financialSummary: {
                totalExpected: 0,
                totalAbatido: 0,
                totalAReceber: 0,
                totalPacotesPagos: 0
            },
            paymentsList: [],
            packagesPaidDetails: []
        };

        // Função auxiliar para pegar valor da sessão (com fallback)
        function getSessionValue(event, pkg) {
            if (event.sessionValue > 0) return event.sessionValue;
            if (pkg?.sessionValue > 0) return pkg.sessionValue;

            // fallback valores por especialidade
            const fallback = {
                fonoaudiologia: 180,
                psicologia: 200,
                'terapia ocupacional': 170,
                fisioterapia: 160,
                pediatria: 220,
                neuroped: 250
            };
            return fallback[event.specialty] || 0;
        }

        // Processa cada agendamento
        for (const event of allAppointments) {
            const pkg = (event.package && event.package._id) ? event.package : null;

            const doctorId = event.doctor?._id?.toString() || 'unknown';
            const value = getSessionValue(event, pkg);

            // Inicializa agrupamento por profissional se não existir
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
                    canceled: 0,
                    payments: { total: 0, methods: { dinheiro: 0, pix: 0, cartão: 0 } }
                };
            }
            const prof = report.byProfessional[doctorId];

            // Totais agendados
            report.totals.scheduled.count++;
            report.totals.scheduled.value += value;
            report.financialSummary.totalExpected += value;

            prof.scheduled++;
            prof.scheduledValue += value;

            // Status
            const opStatus = (event.operationalStatus || '').toLowerCase();
            const clinicalStatus = (event.clinicalStatus || '').toLowerCase();

            // Concluídos (usando status clínico ou operacional)
            if (['concluído', 'concluido', 'completed'].includes(clinicalStatus) || ['concluído', 'concluido', 'completed'].includes(opStatus)) {
                report.totals.completed.count++;
                report.totals.completed.value += value;
                prof.completed++;
                prof.completedValue += value;

                if (event.patient?._id) uniquePatientIds.add(event.patient._id.toString());
            }

            // Ausências
            if (opStatus === 'faltou') {
                report.totals.absences.count++;
                report.totals.absences.estimatedLoss += value;
                prof.absences++;
            }

            // Cancelados
            if (['cancelado', 'canceled'].includes(opStatus)) {
                report.totals.canceled.count++;
                report.totals.canceled.value += value;
                prof.canceled++;
            }

            // Valores abatidos e a receber (pacote ou avulso)
            if (event.serviceType === 'package_session') {
                report.financialSummary.totalAbatido += value;
            } else {
                report.financialSummary.totalAReceber += value;
            }
            // Pagamentos para o resumo por profissional e geral
            let paymentMethod = '';
            if (event.serviceType === 'package_session' && pkg) {
                paymentMethod = normalizePaymentMethod(pkg.paymentMethod);
            } else {
                paymentMethod = normalizePaymentMethod(event.paymentMethod);
            }

            paymentsSummary.count++;
            paymentsSummary.value += value;
            paymentsSummary.methods[paymentMethod] += value;

            prof.payments.total += value;
            prof.payments.methods[paymentMethod] += value;
        }

        report.totals.uniquePatients = uniquePatientIds.size;

        // Montar array byProfessional para enviar no JSON
        report.byProfessional = Object.values(report.byProfessional);

        // Total pago dos pacotes no dia (soma totalPaid dos pacotes vinculados)
        let totalPacotesPagos = 0;
        for (const pkg of allPackages) {
            if (pkg.payments && typeof pkg.totalPaid === 'number') {
                totalPacotesPagos += pkg.totalPaid;
            } else if (pkg.totalPaid && typeof pkg.totalPaid === 'number') {
                totalPacotesPagos += pkg.totalPaid;
            }
        }
        report.financialSummary.totalPacotesPagos = totalPacotesPagos;

        // Montar lista detalhada de pagamentos para o front (busca pagamentos pagos do dia)
        const paymentsOnDay = await Payment.find({ createdAt: { $gte: startOfDay, $lte: endOfDay }, status: 'paid' })
            .populate('doctor patient')
            .lean();

        report.paymentsList = paymentsOnDay.map(payment => ({
            id: payment._id,
            amount: payment.amount,
            paymentMethod: payment.paymentMethod || 'dinheiro',
            date: payment.createdAt,
            doctorName: payment.doctor?.fullName || 'Desconhecido',
            patientName: payment.patient?.fullName || 'Desconhecido'
        }));

        // Detalhes dos pacotes pagos no dia (filtra pacotes com pagamentos no período)
        report.packagesPaidDetails = allPackages.filter(pkg =>
            pkg.payments?.some(p => p.createdAt >= startOfDay && p.createdAt <= endOfDay)
        ).map(pkg => ({
            id: pkg._id,
            patientId: pkg.patient,
            doctorId: pkg.doctor,
            totalPaid: pkg.totalPaid || 0,
            balance: pkg.balance || 0,
            sessionsPerWeek: pkg.sessionsPerWeek,
            durationMonths: pkg.durationMonths
        }));

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

