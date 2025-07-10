import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';
import { calculateSessionDates, isWeekend } from '../services/packageService.js';
import { extractTimeFromDateTime } from '../utils/horaFormat.js';

const APPOINTMENTS_API_BASE_URL = 'http://167.234.249.6:5000/api';
const validateInputs = {
    sessionType: (type) => ['fonoaudiologia', 'terapeuta ocupacional', 'psicologia', 'fisioterapia'].includes(type),
    paymentMethod: (method) => ['dinheiro', 'pix', 'cartão'].includes(method),
    paymentType: (type) => ['full', 'per-session', 'partial'].includes(type)
};

// Operações CRUD Completas
export const packageOperations = {
    create: async (req, res) => {
        console.log('Criando pacote...', req.body);
        const mongoSession = await mongoose.startSession();

        const {
            durationMonths,
            sessionsPerWeek,
            patientId,
            doctorId,
            paymentMethod,
            paymentType,
            sessionType,
            sessionValue,
            amountPaid,
            dateTime,
            time // Data inicial para a primeira sessão
        } = req.body;

        try {
            mongoSession.startTransaction();

            // Validações básicas
            if (!patientId || !doctorId || !sessionType || !dateTime || !time || !paymentType) {
                throw new Error("Campos obrigatórios faltando: paciente, profissional, tipo de sessão ou data inicial");
            }

            const hour = parseInt(time.split(':')[0]);
            if (hour < 8 || hour > 19) {
                throw new Error("Horário fora do expediente (8:00 às 19:00)");
            }

            if (amountPaid && parseFloat(amountPaid) > 0 && !paymentMethod) {
                throw new Error("Método de pagamento é obrigatório se um valor foi pago");
            }

            if (durationMonths < 1 || durationMonths > 12) {
                throw new Error("Duração inválida (1-12 meses)");
            }

            if (sessionsPerWeek < 1 || sessionsPerWeek > 5) {
                throw new Error("Sessões por semana inválidas (1-5)");
            }


            if (!time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
                throw new Error("Formato de horário inválido. Use HH:mm");
            }

            // Validar data inicial
            const startDateObj = new Date(dateTime);
            /*  if (startDateObj.getTime() < Date.now()) {
                 throw new Error("A data e hora devem ser futuras");
             } */

            if (isWeekend(startDateObj)) {
                throw new Error("A data inicial não pode ser no fim de semana");
            }

            // Calcular total de sessões
            const totalSessions = Math.floor(durationMonths * 4 * sessionsPerWeek);
            startDateObj.setHours(startDateObj.getHours() + 3);
            // Calcular datas das sessões
            const sessionDates = calculateSessionDates(
                startDateObj,
                totalSessions,
                sessionsPerWeek
            );

            // Criar o pacote
            const newPackage = new Package({
                patient: patientId,
                doctor: doctorId,
                sessionValue,
                sessionType,
                paymentType,
                paymentMethod,
                status: 'active',
                durationMonths: parseInt(durationMonths, 10),
                sessionsPerWeek: parseInt(sessionsPerWeek, 10),
                totalSessions,
                date: startDateObj
            });

            await newPackage.save({ session: mongoSession });

            // Criar sessões com datas calculadas
            const sessionsToCreate = sessionDates.map((date, index) => ({
                date: date,
                session: `Sessão ${index + 1}`, // Mantemos o nome da sessão
                sessionType: newPackage.sessionType,
                value: newPackage.sessionValue,
                package: newPackage._id,
                status: 'scheduled',
                doctor: newPackage.doctor,
                patient: newPackage.patient,
                isPaid: true,
                appointmentId: null,
                confirmedAbsence: req.body.status === 'canceled'
                    ? req.body.confirmedAbsence
                    : null
            }));

            const createdSessions = await Session.insertMany(sessionsToCreate, { session: mongoSession });

            // Atualizar pacote com IDs das sessões
            newPackage.sessions = createdSessions.map(s => s._id);
            await newPackage.save({ session: mongoSession });

            // Criar agendamentos para cada sessão
            for (const session of createdSessions) {
                // Verificar se já existe agendamento
                const existing = await db.appointments.findOne({
                    "patient": newAppointment.patient,
                    "doctor._id": newAppointment.doctor._id,
                    "date": {
                        $gte: new Date(newAppointment.date.setHours(0, 0, 0, 0)),
                        $lt: new Date(newAppointment.date.setHours(23, 59, 59, 999))
                    },
                    "time": newAppointment.time
                });

                if (existing) {
                    throw new Error("Já existe um agendamento para este paciente/médico no mesmo horário");
                }

                if (existing) {
                    await mongoSession.abortTransaction();
                    const patientName = await User.findById(session.patient).select('name');
                    const doctorName = await User.findById(session.doctor).select('name');
                    throw new Error(`Conflito de agendamento: ${patientName.name} já tem sessão com ${doctorName.name} em ${session.date.toLocaleDateString()} às ${time}`);
                }
                const appointment = new Appointment({
                    patient: session.patient,
                    doctor: session.doctor,
                    date: session.date,
                    duration: 40,
                    specialty: session.sessionType,
                    operationalStatus: 'agendado',
                    clinicalStatus: 'pendente',
                    session: session._id,
                    sessionType: session.sessionType,
                    time: time,
                });

                await appointment.save({ session: mongoSession });
                session.appointmentId = appointment._id;
                await session.save({ session: mongoSession });
            }

            // Processar pagamento inicial se houver
            if (amountPaid && parseFloat(amountPaid) > 0) {
                const paymentAmount = parseFloat(amountPaid);
                const totalPackageValue = newPackage.sessionValue * newPackage.totalSessions;

                const paymentData = {
                    package: newPackage._id,
                    amount: paymentAmount,
                    paymentMethod: paymentMethod,
                    patient: newPackage.patient,
                    doctor: newPackage.doctor,
                    notes: 'Pagamento inicial do pacote'
                };

                const initialPaymentDoc = new Payment(paymentData);
                await initialPaymentDoc.save({ session: mongoSession });

                // Atualizar pacote
                newPackage.payments = [initialPaymentDoc._id];
                newPackage.totalPaid = paymentAmount;
                newPackage.balance = Math.max((totalPackageValue - paymentAmount), 0);

                if (paymentAmount >= totalPackageValue) {
                    await Session.updateMany(
                        { _id: { $in: createdSessions.map(s => s._id) } },
                        {
                            isPaid: true,
                            paymentMethod: paymentMethod
                        },
                        { session: mongoSession }
                    );
                } else {
                    // Pagamento parcial
                    const sessionsPaidCount = Math.floor(paymentAmount / newPackage.sessionValue);

                    if (sessionsPaidCount > 0) {
                        await Session.updateMany(
                            { _id: { $in: createdSessions.slice(0, sessionsPaidCount).map(s => s._id) } },
                            {
                                isPaid: true,
                                paymentMethod: paymentMethod
                            },
                            { session: mongoSession }
                        );
                    }
                }

                await newPackage.save({ session: mongoSession });
            }

            await mongoSession.commitTransaction();

            // Popular resultado para resposta
            const populatedPackage = await Package.findById(newPackage._id)
                .populate({
                    path: 'sessions',
                    select: 'date status doctor isPaid paymentMethod'
                })
                .populate({
                    path: 'payments',
                    select: 'amount paymentMethod date'
                })
                .populate('patient doctor');

            res.status(201).json(populatedPackage);
        } catch (error) {
            console.error('Erro ao criar pacote:', error);
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }

            if (error.name === 'ValidationError') {
                const errors = Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {});
                return res.status(400).json({ message: 'Falha na validação', errors });
            }

            res.status(500).json({ error: error.message || 'Erro interno' });
        } finally {
            await mongoSession.endSession();
        }
    },

    // Ler
    get: {
        all: async (req, res) => {
            try {
                const { patientId } = req.query; // ou req.params ou req.user, dependendo da lógica

                if (!patientId) {
                    return res.status(400).json({ message: 'ID do paciente é obrigatório.' });
                }

                const packages = await Package.find({ patient: patientId })
                    .populate({
                        path: 'sessions',
                    })
                    .populate({
                        path: 'payments',
                    })
                    .populate('patient')
                    .populate({
                        path: 'doctor',
                        model: 'Doctor',
                        select: '_id fullName specialty',
                    })
                    .lean();

                const enhancedPackages = packages.map(pkg => ({
                    ...pkg,
                    remaining: pkg.totalSessions - pkg.sessionsDone,
                    totalValue: pkg.sessionValue * pkg.totalSessions
                }));

                res.status(200).json(enhancedPackages);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        },
        byId: async (req, res) => {
            try {
                const pkg = await Package.findById(req.params.id)
                    .populate('patient', 'name');
                if (!pkg) return res.status(404).json({ error: 'Pacote não encontrado' });
                res.json(pkg);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        },
        search: async (req, res) => {
            try {
                const { status, type, startDate, endDate } = req.query;
                const filters = {};

                if (status) filters.status = status;
                if (type) filters.type = type;
                if (startDate && endDate) {
                    filters.createdAt = {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    };
                }

                const packages = await Package.find(filters)
                    .populate('sessions payments')
                    .lean();

                res.status(200).json(packages);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        },
    },


    // Atualizar
    update: {
        package: async (req, res) => {
            try {
                const updated = await Package.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true, runValidators: true }
                );
                if (!updated) return res.status(404).json({ error: 'Pacote não encontrado' });
                res.json(updated);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        },
        session: async (req, res) => {
            const mongoSession = await mongoose.startSession();
            try {
                await mongoSession.startTransaction();
                const { sessionId } = req.params;
                const {
                    date,
                    notes,
                    doctorId,
                    patientId,
                    status,
                    confirmedAbsence,
                    payment = {},
                    sessionType,
                    specialty
                } = req.body;

                // Validações básicas
                if (!date || isNaN(new Date(date).getTime())) {
                    throw new Error("Data inválida ou não fornecida");
                }

                if (status && !['pending', 'completed', 'canceled', 'scheduled'].includes(status)) {
                    throw new Error("Status inválido. Valores permitidos: pending, completed, canceled, scheduled");
                }

                // Validação para sessões canceladas
                if (status === 'canceled' && confirmedAbsence === undefined) {
                    throw new Error("Para sessões canceladas, o campo 'confirmedAbsence' é obrigatório");
                }

                // Busca a sessão com transação
                const sessionDoc = await Session.findById(sessionId)
                    .populate({
                        path: 'package',
                        select: 'sessionType sessionsPerWeek doctor patient sessionValue totalSessions totalPaid sessionsDone status'
                    })
                    .populate('appointmentId')
                    .session(mongoSession);

                if (!sessionDoc) throw new Error("Sessão não encontrada");

                // Guarda o status anterior para verificar mudanças
                const previousStatus = sessionDoc.status;

                // Atualiza campos básicos da sessão
                sessionDoc.date = new Date(date);
                sessionDoc.notes = notes || sessionDoc.notes;

                if (doctorId) {
                    sessionDoc.doctor = new mongoose.Types.ObjectId(doctorId);
                }

                if (patientId) {
                    sessionDoc.patient = patientId;
                }

                if (status) {
                    sessionDoc.status = status;
                }

                // Atualização do campo confirmedAbsence
                if (confirmedAbsence !== undefined) {
                    sessionDoc.confirmedAbsence = confirmedAbsence;
                    if (status !== 'canceled') {
                        sessionDoc.confirmedAbsence = null;
                    }
                }

                // Valor padrão para sessões canceladas
                if (status === 'canceled' && confirmedAbsence === undefined) {
                    if (sessionDoc.confirmedAbsence === undefined || sessionDoc.confirmedAbsence === null) {
                        sessionDoc.confirmedAbsence = false;
                    }
                }

                if (sessionType) {
                    sessionDoc.sessionType = sessionType;
                }

                // Usa specialty se sessionType não foi enviado
                if (!sessionType && specialty) {
                    sessionDoc.sessionType = specialty;
                }

                // 1. Verificar se o status mudou para 'completed'
                if (status === 'completed' && previousStatus !== 'completed') {
                    // Verificar se o pacote existe
                    if (!sessionDoc.package) {
                        throw new Error("Pacote não encontrado para esta sessão");
                    }

                    // Atualizar o pacote - incrementar sessionsDone
                    const updatedPackage = await Package.findByIdAndUpdate(
                        sessionDoc.package._id,
                        { $inc: { sessionsDone: 1 } },
                        { new: true, session: mongoSession }
                    );

                    // Verificar se o pacote foi concluído
                    if (updatedPackage.sessionsDone >= updatedPackage.totalSessions) {
                        await Package.findByIdAndUpdate(
                            updatedPackage._id,
                            { status: 'finished' },
                            { session: mongoSession }
                        );
                    }
                }

                // 2. Verificar se o status foi alterado de 'completed' para outro status
                if (previousStatus === 'completed' && status !== 'completed') {
                    // Verificar se o pacote existe
                    if (!sessionDoc.package) {
                        throw new Error("Pacote não encontrado para esta sessão");
                    }

                    // Atualizar o pacote - decrementar sessionsDone
                    const updatedPackage = await Package.findByIdAndUpdate(
                        sessionDoc.package._id,
                        { $inc: { sessionsDone: -1 } },
                        { new: true, session: mongoSession }
                    );

                    // Reverter status se necessário
                    if (updatedPackage.status === 'finished' &&
                        updatedPackage.sessionsDone < updatedPackage.totalSessions) {
                        await Package.findByIdAndUpdate(
                            updatedPackage._id,
                            { status: 'active' },
                            { session: mongoSession }
                        );
                    }
                }

                // Preparar dados para agendamento
                const formattedTime = extractTimeFromDateTime(date);
                const getOperationalStatus = () => {
                    if (status === 'completed') return 'confirmado';
                    if (status === 'canceled') return 'cancelado';
                    return 'agendado';
                };

                const getClinicalStatus = () => {
                    if (status === 'completed') return 'concluído';
                    if (status === 'canceled') {
                        return confirmedAbsence ? 'faltou' : 'cancelado';
                    }
                    return 'pendente';
                };

                // Gerenciamento de agendamento
                if (sessionDoc.appointmentId) {
                    // Atualização de agendamento existente
                    const appointment = await Appointment.findById(sessionDoc.appointmentId._id)
                        .session(mongoSession);

                    if (appointment) {
                        appointment.patient = patientId || sessionDoc.patient;
                        appointment.doctor = doctorId || sessionDoc.doctor;
                        appointment.date = new Date(date);
                        appointment.duration = 40;
                        appointment.specialty = sessionType || sessionDoc.sessionType;
                        appointment.operationalStatus = getOperationalStatus();
                        appointment.clinicalStatus = getClinicalStatus();
                        appointment.session = sessionDoc._id;
                        appointment.sessionType = sessionType || sessionDoc.sessionType;
                        appointment.time = formattedTime;

                        await appointment.save({ session: mongoSession });
                    }
                } else {
                    // Criação de novo agendamento
                    const appointment = new Appointment({
                        patient: patientId || sessionDoc.patient,
                        doctor: doctorId || sessionDoc.doctor,
                        date: new Date(date),
                        duration: 40,
                        specialty: sessionType || sessionDoc.sessionType,
                        operationalStatus: getOperationalStatus(),
                        clinicalStatus: getClinicalStatus(),
                        session: sessionDoc._id,
                        sessionType: sessionType || sessionDoc.sessionType,
                        time: formattedTime
                    });

                    await appointment.save({ session: mongoSession });
                    sessionDoc.appointmentId = appointment._id;
                }

                // Salvar sessão atualizada
                await sessionDoc.save({ session: mongoSession });
                await mongoSession.commitTransaction();

                // Buscar dados completos para resposta
                const updatedSession = await Session.findById(sessionId)
                    .populate({
                        path: 'package',
                        populate: { path: 'payments' }
                    })
                    .populate('doctor patient')
                    .populate('appointmentId');

                res.json({
                    success: true,
                    session: updatedSession,
                    package: updatedSession.package
                });

            } catch (error) {
                console.error("Erro na atualização da sessão:", error);
                if (mongoSession.inTransaction()) {
                    await mongoSession.abortTransaction();
                }

                const statusCode = error.name === 'ValidationError' ? 400 : 500;

                res.status(statusCode).json({
                    success: false,
                    error: error.message,
                    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            } finally {
                await mongoSession.endSession();
            }
        }
    },

    // Deletar
    delete: {
        package: async (req, res) => {
            try {
                await Package.findByIdAndDelete(req.params.id);
                res.status(204).send();
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        },
        session: async (req, res) => {
            try {
                const pkg = await Package.findByIdAndUpdate(
                    req.params.id,
                    { $pull: { sessions: { _id: req.params.sessionId } } },
                    { new: true }
                );
                res.json(pkg);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // 💡 Extrai erros campo a campo
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
        }
    },

    // Operações Específicas
    addSession: async (req, res) => {
        try {
            const pkg = await Package.findByIdAndUpdate(
                req.params.id,
                { $push: { sessions: req.body } },
                { new: true, runValidators: true }
            );
            res.json(pkg);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // 💡 Extrai erros campo a campo
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
    },

    /* 
    update.session e mais robusto e faz as mesma coisas
    useSession: async (req, res) => {
        const mongoSession = await mongoose.startSession();
        try {
            await mongoSession.startTransaction();

            // Extrair apenas os campos necessários
            const { sessionId, payment } = req.body;
            const { status } = req.body; // Novo campo para status
            console.log(`requisiocao use session`, req.body)
            // Validação reforçada
            if (!sessionId) throw new Error("ID da sessão é obrigatório.");
            if (!status) throw new Error("Status é obrigatório.");
            if (!['completed', 'canceled'].includes(status)) {
                throw new Error("Status inválido. Use 'completed' ou 'canceled'.");
            }

            // 1. Atualizar sessão com o status recebido
            const sessionDoc = await Session.findByIdAndUpdate(
                sessionId,
                { status },
                { new: true, session: mongoSession }
            ).populate('package');

            if (!sessionDoc) throw new Error("Sessão não encontrada.");

            // 2. Atualizar pacote apenas se for conclusão de sessão
            if (status === 'completed') {
                const updatedPackage = await Package.findByIdAndUpdate(
                    sessionDoc.package._id,
                    { $inc: { sessionsDone: 1 } },
                    { new: true, session: mongoSession }
                );

                // 3. Atualizar status do pacote
                const newPackageStatus = updatedPackage.sessionsDone >= updatedPackage.totalSessions
                    ? 'finished'
                    : 'active';

                await Package.findByIdAndUpdate(
                    sessionDoc.package._id,
                    { status: newPackageStatus },
                    { session: mongoSession }
                );
            }

            // 4. Atualizar agendamento associado
            if (sessionDoc.appointmentId) {
                const appointmentStatus = status === 'completed'
                    ? 'completed'
                    : 'canceled';

                await axios.patch(
                    `${APPOINTMENTS_API_BASE_URL}/appointments/${sessionDoc.appointmentId}`,
                    { status: appointmentStatus },
                    {
                        headers: { Authorization: req.headers.authorization },
                        timeout: 3000
                    }
                );
            }

            // 5. Processar pagamento apenas para sessões concluídas
            if (status === 'completed' && payment?.amount > 0) {
                if (!payment.method || !validateInputs.paymentMethod(payment.method)) {
                    throw new Error("Método de pagamento inválido.");
                }

                const newPayment = new Payment({
                    amount: payment.amount,
                    paymentMethod: payment.method,
                    package: sessionDoc.package._id,
                    session: sessionDoc._id,
                    patient: sessionDoc.package.patient,
                    doctor: sessionDoc.package.doctor
                });

                await newPayment.save({ session: mongoSession });

                // Atualizar sessão como paga
                await Session.findByIdAndUpdate(
                    sessionId,
                    { isPaid: true },
                    { session: mongoSession }
                );

                // Atualizar saldo do pacote
                await Package.findByIdAndUpdate(
                    sessionDoc.package._id,
                    {
                        $inc: { totalPaid: payment.amount },
                        balance: new Expression('sessionValue * totalSessions - totalPaid')
                    },
                    { session: mongoSession }
                );
            }

            await mongoSession.commitTransaction();

            // Buscar dados atualizados
            const finalPackage = await Package.findById(sessionDoc.package._id)
                .populate({
                    path: 'sessions',
                    match: { _id: sessionId },
                    select: 'date status doctor isPaid paymentAmount'
                })
                .populate('payments patient doctor');

            res.json({
                ...finalPackage.toObject(),
                updatedSession: finalPackage.sessions[0]
            });

        } catch (error) {
            await mongoSession.abortTransaction();
            console.error('Erro em useSession:', error);

            // Tratamento de erros aprimorado
            let statusCode = 500;
            let message = 'Erro interno';

            if (error.name === 'ValidationError') {
                statusCode = 400;
                message = 'Dados inválidos';
            } else if (error.response) {
                // Erro da API de agendamentos
                statusCode = error.response.status;
                message = `Erro no serviço de agendamentos: ${error.response.data.message || error.response.statusText}`;
            } else if (error.message.includes('não encontrada')) {
                statusCode = 404;
                message = error.message;
            } else if (error.message.includes('inválido')) {
                statusCode = 400;
                message = error.message;
            }

            res.status(statusCode).json({
                error: message,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        } finally {
            await mongoSession.endSession();
        }
    }, */

    registerPayment: async (req, res) => {
        const mongoSession = await mongoose.startSession();
        const packageId = req.params.id;
        try {
            mongoSession.startTransaction();
            const {
                amount,
                paymentMethod,
                // coveredSessions, // Se você ainda usa isso, precisará de lógica adicional
                notes,
                // Adicione patient e doctor se forem necessários no Payment e não derivados do pacote
                // patient, 
                // doctor 
            } = req.body;

            if (!amount || !paymentMethod) {
                throw new Error("Valor e método de pagamento são obrigatórios.");
            }

            const pkg = await Package.findById(packageId).session(mongoSession);
            if (!pkg) {
                throw new Error("Pacote não encontrado");
            }

            // Lógica para coveredSessions removida para simplificar, 
            // pois o pagamento agora é um documento próprio e pode ou não estar ligado a sessões específicas.
            // Se precisar vincular a sessões, o modelo Payment precisaria de um array de sessionIds.

            const paymentData = {
                package: pkg._id,
                amount: parseFloat(amount),
                paymentMethod: paymentMethod,
                patient: patient || pkg.patient,
                doctor: doctor || pkg.doctor,
                notes: notes || 'Pagamento avulso para o pacote.'
            };

            const newPaymentDoc = new Payment(paymentData);
            await newPaymentDoc.save({ session: mongoSession });

            pkg.payments.push(newPaymentDoc._id);
            pkg.totalPaid = (pkg.totalPaid || 0) + parseFloat(amount);
            await pkg.save({ session: mongoSession });

            await mongoSession.commitTransaction();

            const updatedPackage = await Package.findById(packageId)
                .populate('patient', 'fullName')
                .populate('doctor', 'fullName')
                .populate('payments');

            res.json(updatedPackage);

        } catch (error) {
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }
            if (error.name === 'ValidationError') {
                // 💡 Extrai erros campo a campo
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
        } finally {
            await mongoSession.endSession();
        }
    },
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Operação de Atualização de Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatus = ['active', 'finished', 'canceled'];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }

        const updated = await Package.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        res.json({
            _id: updated._id,
            status: updated.status,
            updatedAt: updated.updatedAt
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // 💡 Extrai erros campo a campo
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
};

// Operação de Relatório
export const generateReport = async (req, res) => {
    try {
        const packages = await Package.find()
            .populate('patient', 'name')
            .lean();

        const reportData = packages.map(pkg => ({
            patient: pkg.patient.name,
            totalSessions: pkg.totalSessions,
            sessionsDone: pkg.sessions.length,
            totalPaid: pkg.totalPaid,
            balance: pkg.balance
        }));

        res.json(reportData);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // 💡 Extrai erros campo a campo
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
};

export const getPackageById = async (req, res) => {
    try {
        const packages = await Package.findById(req.params.id)
            .populate('patient', 'name birthDate'); // Campos necessários

        if (!packages) return res.status(404).json({ error: 'Pacote não encontrado' });
        res.json(packages);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // 💡 Extrai erros campo a campo
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
}