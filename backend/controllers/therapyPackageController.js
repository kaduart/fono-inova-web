import axios from 'axios';
import mongoose from 'mongoose';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';

const APPOINTMENTS_API_BASE_URL = 'http://localhost:5000/api';
const validateInputs = {
    sessionType: (type) => ['fonoaudiologia', 'terapeuta ocupacional', 'psicologia', 'fisioterapia'].includes(type),
    paymentMethod: (method) => ['dinheiro', 'pix', 'cartão'].includes(method),
    paymentType: (type) => ['full', 'per-session', 'partial'].includes(type)
};

// Operações CRUD Completas
export const packageOperations = {
    create: async (req, res) => {
        const mongoSession = await mongoose.startSession();
        const {
            patientId,
            professional,
            // totalSessions,
            sessionType,
            paymentType,
            sessionValue,
            amountPaid,
            paymentMethod,
            durationMonths,
            sessionsPerWeek
        } = req.body;
        console.log("Pacote: ", req.body);

        // Validações adicionais
        if (!durationMonths || !sessionsPerWeek) {
            throw new Error("Duração e frequência são obrigatórias");
        }

        try {
            mongoSession.startTransaction();

            // Validações básicas
            if (!patientId || !professional || !sessionType) {
                throw new Error("Campos obrigatórios do pacote faltando.");
            }

            if (amountPaid && parseFloat(amountPaid) > 0 && !paymentMethod) {
                throw new Error("Método de pagamento é obrigatório se um valor foi pago.");
            }

            if (!validateInputs.sessionType(sessionType)) {
                throw new Error('Tipo de sessão inválido');
            }

            if (durationMonths < 1 || durationMonths > 12) {
                throw new Error("Duração inválida (1-12 meses)");
            }
            if (sessionsPerWeek < 1 || sessionsPerWeek > 5) {
                throw new Error("Sessões por semana inválidas (1-5)");
            }

            const newPackage = new Package({
                patient: patientId,
                professional,
                sessionType,
                sessions: [],
                payments: [], // Iniciar com array vazio
                status: 'active',
                // totalPaid: 0,
                durationMonths: parseInt(durationMonths, 10), // Adicionado
                sessionsPerWeek: parseInt(sessionsPerWeek, 10),
            });


            await newPackage.save({ session: mongoSession });

            // Criar Sessões
            const sessionsToCreate = Array.from({ length: newPackage.totalSessions }, () => ({
                date: null,
                sessionType: newPackage.sessionType,
                value: newPackage.sessionValue,
                package: newPackage._id,
                status: 'pending',
                professional: newPackage.professional,
                patient: patientId,
                isPaid: false // Garantir que isPaid seja inicializado como false
            }));

            const createdSessions = await Session.insertMany(sessionsToCreate, { session: mongoSession });
            newPackage.sessions = createdSessions.map(s => s._id);
            await newPackage.save({ session: mongoSession });

            // Processar pagamento inicial, se houver
            if (amountPaid && parseFloat(amountPaid) > 0) {
                const paymentAmount = parseFloat(amountPaid);
                const totalPackageValue = newPackage.sessionValue * newPackage.totalSessions;

                const paymentData = {
                    package: newPackage._id,
                    amount: paymentAmount,
                    paymentMethod: paymentMethod,
                    patient: newPackage.patient,
                    professional: newPackage.professional,
                    notes: 'Pagamento inicial referente à criação do pacote.'
                };

                // Criar o pagamento como um documento separado
                const initialPaymentDoc = new Payment(paymentData);
                await initialPaymentDoc.save({ session: mongoSession });

                // Atualizar o pacote com a referência ao pagamento
                newPackage.payments = [initialPaymentDoc._id]; // Usar array novo para evitar duplicação
                newPackage.totalPaid = paymentAmount;
                newPackage.balance = Math.max((totalPackageValue - paymentAmount), 0);

                // Calcular quantas sessões podem ser pagas com o valor inicial
                const sessionsPaidCount = Math.floor(paymentAmount / newPackage.sessionValue);
                console.log(`Marcando ${sessionsPaidCount} sessões como pagas`);

                if (sessionsPaidCount > 0) {
                    // Buscar as primeiras sessões do pacote (ordenadas por data de criação)
                    const sessionsToUpdate = await Session.find({
                        package: newPackage._id,
                        isPaid: false
                    })
                        .sort({ createdAt: 1 })
                        .limit(sessionsPaidCount)
                        .session(mongoSession);

                    if (sessionsToUpdate.length > 0) {
                        await Session.updateMany(
                            { _id: { $in: sessionsToUpdate.map(s => s._id) } },
                            {
                                $set: {
                                    isPaid: true,
                                    paymentMethod: paymentMethod,
                                    status: 'pending'
                                }
                            },
                            { session: mongoSession }
                        );
                    }

                    console.log(`${sessionsToUpdate.length} sessões marcadas como pagas`);
                }

                await newPackage.save({ session: mongoSession });
            }

            await mongoSession.commitTransaction();

            // Recarregar o pacote com todas as relações populadas
            const populatedPackage = await Package.findById(newPackage._id)
                .populate({
                    path: 'sessions',
                    select: 'date status professional isPaid paymentMethod'
                })
                .populate({
                    path: 'payments',
                    select: 'amount paymentMethod date'
                })
                .populate('patient professional');

            res.status(201).json(populatedPackage);
        } catch (error) {
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }
            console.error("Erro ao criar pacote:", error);
            res.status(400).json({ error: "Erro ao criar pacote", details: error.message });
        } finally {
            await mongoSession.endSession();
        }
    },


    // Ler
    get: {
        all: async (req, res) => {
            try {
                const packages = await Package.find()
                    .populate({
                        path: 'sessions',
                    })
                    .populate({
                        path: 'payments',
                    })
                    .populate('patient')
                    .populate({
                        path: 'professional',
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
                res.status(500).json({
                    message: 'Erro ao listar pacotes',
                    error: error.message
                });
            }
        },
        byId: async (req, res) => {
            try {
                const pkg = await Package.findById(req.params.id)
                    .populate('patientId', 'name');
                if (!pkg) return res.status(404).json({ error: 'Pacote não encontrado' });
                res.json(pkg);
            } catch (error) {
                res.status(500).json({ error: error.message });
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
                res.status(500).json({
                    message: 'Erro ao buscar pacotes',
                    error: error.message
                });
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
                res.status(400).json({ error: error.message });
            }
        },
        session: async (req, res) => {
            const mongoSession = await mongoose.startSession();
            try {
                await mongoSession.startTransaction();
                const { sessionId } = req.params;
                const { date, status } = req.body;

                // Buscar sessão com dados do pacote
                const session = await Session.findById(sessionId)
                    .populate({
                        path: 'package',
                        select: 'sessionType sessionsPerWeek professional patient'
                    })
                    .session(mongoSession);

                if (!session) throw new Error("Sessão não encontrada.");
                const patientId = session.package.patient;

                console.log("Sessão atualizada:-----------", session);
                console.log("reqqqqqqqqqqqqqqqqq----------------------->:", req.body);

                console.log("Sessão atualizada:-----------", date);

                const sessionDate = new Date(date);
                const formattedDateBR = sessionDate.toISOString().split('T')[0]; // "2025-05-28"

                const formattedTime = sessionDate.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                console.log("formattedDateBR:-----------", formattedDateBR);
                console.log("formattedTime:-----------", formattedTime);

                // Sincronizar com API de agendamentos
                const appointmentData = {
                    doctorId: session.package.professional,
                    date: sessionDate,
                    time: formattedTime, // Extrair apenas a hora
                    status: 'agendado', // Usar valor padrão sem acento
                    reason: req.body.notes || 'Sessão terapêutica agendada',
                    sessionType: session.package.sessionType,
                    patientId: patientId,
                    metadata: {
                        sessionId: session._id,
                        packageId: session.package._id
                    }
                };
                console.log("appointmentData:-----------", appointmentData);
                const authHeader = req.headers.authorization;
                const headers = {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                };
                try {
                    // Criar ou atualizar agendamento
                    if (session.appointmentId) {
                        await axios.put(`${APPOINTMENTS_API_BASE_URL}/appointments/${session.appointmentId}`, appointmentData, { headers });
                        session.date = sessionDate;
                        session.status = status;
                        session.sessionType = session.package.sessionType;
                        session.professional = session.package.professional;
                        session.patient = patientId;
                        await session.save({ session: mongoSession });
                    } else {
                        console.log("baetuu no endopoit");
                        const response = await axios.post(`${APPOINTMENTS_API_BASE_URL}/appointments`, appointmentData, { headers });
                        console.log("response.data:----------- responseee", response.data);
                        session.date = sessionDate;
                        session.status = 'schedule';
                        session.sessionType = session.package.sessionType;
                        session.professional = session.package.professional;
                        session.patient = patientId;
                        const savedSession = await session.save({ session: mongoSession });
                        console.log('Sessão salva:', savedSession);
                    }

                    await Package.findByIdAndUpdate(session.package._id, {
                        $addToSet: { sessions: session._id }
                    }, { session: mongoSession });


                    const pkg = await Package.findById(session.package._id).populate('sessions');
                    console.log(pkg.sessions.map(s => s._id.toString()));
                } catch (axiosError) {
                    if (axiosError.response && axiosError.response.status === 409) {
                        throw new Error("Conflito: já existe um agendamento nesse horário.");
                    }
                    throw axiosError;
                }

                await mongoSession.commitTransaction();
                res.json(session);

            } catch (error) {
                if (mongoSession.inTransaction()) await mongoSession.abortTransaction();
                res.status(400).json({ error: error.message });
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
                res.status(500).json({ error: error.message });
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
                res.status(400).json({ error: error.message });
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
            res.status(400).json({ error: error.message });
        }
    },

    useSession: async (req, res) => {
        const mongoSession = await mongoose.startSession();
        try {
            await mongoSession.startTransaction();
            const { sessionId, payment } = req.body;

            // Validação
            if (!sessionId) throw new Error("ID da sessão é obrigatório.");

            // 1. Marcar sessão como concluída
            const sessionDoc = await Session.findByIdAndUpdate(
                sessionId,
                { status: 'completed' },
                { new: true, session: mongoSession }
            ).populate('package');

            if (!sessionDoc) throw new Error("Sessão não encontrada.");

            // 2. Atualizar pacote
            const updatedPackage = await Package.findByIdAndUpdate(
                sessionDoc.package._id,
                { $inc: { sessionsDone: 1 } },
                { new: true, session: mongoSession }
            );

            // 3. Atualizar status do pacote
            const newStatus = updatedPackage.sessionsDone >= updatedPackage.totalSessions
                ? 'finished'
                : 'active';

            await Package.findByIdAndUpdate(
                sessionDoc.package._id,
                { status: newStatus },
                { session: mongoSession }
            );

            console.log("Pacote atualizado:", updatedPackage);
            // 4. Marcar agendamento como concluído (Apenas Aqui!)
            if (sessionDoc.appointmentId) {
                await axios.patch(
                    `${APPOINTMENTS_API_BASE_URL}/appointments/${sessionDoc.appointmentId}`,
                    { status: 'completed' }, // Usar valor padrão sem acento
                    {
                        headers: { Authorization: req.headers.authorization },
                        timeout: 3000
                    }
                );
            }
            console.log("Agendamento atualizado para concluído:", sessionDoc.appointmentId);
            // 5. Processar pagamento (se existir)
            if (payment?.amount > 0) {
                console.log("Processando pagamento:0", payment);
                if (!payment.method || !validateInputs.paymentMethod(payment.method)) {
                    throw new Error("Método de pagamento inválido.");
                }

                console.log("Processando pagamento: 1", payment);
                const newPayment = new Payment({
                    amount: payment.amount,
                    paymentMethod: payment.method,
                    package: updatedPackage._id,
                    session: sessionDoc._id,
                    patient: updatedPackage.patient,
                    professional: updatedPackage.professional
                });
                console.log("Processando pagamento: 2", payment);

                await newPayment.save({ session: mongoSession });
                console.log("Processando pagamento: 3", payment);

                // Atualizar isPaid na sessão
                await Session.findByIdAndUpdate(
                    sessionId,
                    { isPaid: true }, // <--- Campo novo aqui
                    { session: mongoSession }
                );

                console.log("Processando pagamento: 4", payment);
                updatedPackage.totalPaid += payment.amount;
                updatedPackage.balance = Math.max(
                    (updatedPackage.sessionValue * updatedPackage.totalSessions) - updatedPackage.totalPaid,
                    0
                );
                console.log("Processando pagamento: 5", payment);

                await updatedPackage.save({ session: mongoSession });
            }

            await mongoSession.commitTransaction();

            const finalPackage = await Package.findById(updatedPackage._id)
                .populate({
                    path: 'sessions',
                    select: 'date status professional isPaid'
                })
                .populate('payments patient professional');

            res.json(finalPackage);

        } catch (error) {
            await mongoSession.abortTransaction();
            res.status(400).json({
                error: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : null
            });
        } finally {
            await mongoSession.endSession();
        }
    },

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
                // Adicione patientId e professionalId se forem necessários no Payment e não derivados do pacote
                // patientId, 
                // professionalId 
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
                patientId: patientId || pkg.patient,
                professionalId: professionalId || pkg.professional,
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
                .populate('professional', 'fullName')
                .populate('payments');

            res.json(updatedPackage);

        } catch (error) {
            if (mongoSession.inTransaction()) {
                await mongoSession.abortTransaction();
            }
            console.error("Erro ao registrar pagamento avulso:", error);
            res.status(400).json({ error: "Erro ao registrar pagamento", details: error.message });
        } finally {
            await mongoSession.endSession();
        }
    },
};

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
        res.status(400).json({ error: error.message });
    }
};

// Operação de Relatório
export const generateReport = async (req, res) => {
    try {
        const packages = await Package.find()
            .populate('patientId', 'name')
            .lean();

        const reportData = packages.map(pkg => ({
            patient: pkg.patientId.name,
            totalSessions: pkg.totalSessions,
            sessionsDone: pkg.sessions.length,
            totalPaid: pkg.totalPaid,
            balance: pkg.balance
        }));

        res.json(reportData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPackageById = async (req, res) => {
    try {
        const packages = await Package.findById(req.params.id)
            .populate('patientId', 'name birthDate'); // Campos necessários

        if (!packages) return res.status(404).json({ error: 'Pacote não encontrado' });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
}