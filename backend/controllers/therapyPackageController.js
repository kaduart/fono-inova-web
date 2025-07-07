import axios from 'axios';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';
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
            totalSessions,
            payments,
            status,
            amountPaid,
            totalPaid,
            balance,
            credit
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: "ID de paciente inválido" });
        }
        // Validações adicionais
        if (!durationMonths || !sessionsPerWeek) {
            throw new Error("Duração e frequência são obrigatórias");
        }

        try {
            mongoSession.startTransaction();

            // Validações básicas
            if (!patientId || !doctorId || !sessionType) {
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
                doctor: doctorId,
                sessionValue,
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
            const sessionsToCreate = Array.from({ length: newPackage.totalSessions }, (_, i) => ({
                date: new Date(),
                session: `Sessão ${i + 1}`,
                sessionType: newPackage.sessionType,
                value: newPackage.sessionValue,
                package: newPackage._id,
                status: 'pending',
                doctor: newPackage.doctor,
                patient: newPackage.patient,
                isPaid: false,
                appointmentId: null
            }));
            console.log('sessionsToCreate', sessionsToCreate)
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
                    sessionValue: sessionValue,
                    patient: newPackage.patient,
                    doctor: newPackage.doctor,
                    notes: 'Pagamento inicial referente à criação do pacote.'
                };
                console.log('paymentData', paymentData)
                // Criar o pagamento como um documento separado
                const initialPaymentDoc = new Payment(paymentData);
                await initialPaymentDoc.save({ session: mongoSession });

                // Atualizar o pacote com a referência ao pagamento
                newPackage.payments = [initialPaymentDoc._id]; // Usar array novo para evitar duplicação
                newPackage.totalPaid = paymentAmount;
                newPackage.balance = Math.max((totalPackageValue - paymentAmount), 0);

                // Calcular quantas sessões podem ser pagas com o valor inicial
                const sessionsPaidCount = Math.floor(paymentAmount / newPackage.sessionValue);

                if (sessionsPaidCount > 0) {
                    const sessionsToUpdate = await Session.find({
                        package: newPackage._id,
                        isPaid: false
                    })
                        .sort({ createdAt: 1 })
                        .limit(sessionsPaidCount)
                        .session(mongoSession);

                    // Atualizar sessões
                    await Session.updateMany(
                        { _id: { $in: sessionsToUpdate.map(s => s._id) } },
                        {
                            isPaid: true,
                            paymentMethod: paymentMethod
                        },
                        { session: mongoSession }
                    );

                    // Atualizar contadores do pacote
                    newPackage.sessionsPaid = sessionsPaidCount;
                    newPackage.sessionsUsed = 0;
                }

                await newPackage.save({ session: mongoSession });
            }

            await mongoSession.commitTransaction();

            // Recarregar o pacote com todas as relações populadas
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
            console.log(error);
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

            return res.status(500).json(error);
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
                const { date, notes, doctorId, patientId } = req.body;

                // Validação da data
                if (!date || isNaN(new Date(date).getTime())) {
                    throw new Error("Data inválida ou não fornecida");
                }

                const session = await Session.findById(sessionId)
                    .populate({
                        path: 'package',
                        select: 'sessionType sessionsPerWeek doctor patient'
                    })
                    .session(mongoSession);

                if (!session) throw new Error("Sessão não encontrada");
                if (!session.package?.doctor || !session.package?.patient) {
                    throw new Error("Pacote associado está incompleto");
                }

                const patient = session.package.patient;
                const sessionDate = new Date(date);
                console.log(`front req-------------`, req.body)
                console.log(`session-------------`, session)
                console.log(`patient--------------------`, patient)
                // Formatação confiável de tempo (UTC)
                const formattedTime = extractTimeFromDateTime(req.body.date);

                const appointmentData = {
                    doctorId: doctorId, // importante
                    patientId: patient.toString(), // importante
                    doctor: new mongoose.Types.ObjectId(doctorId),
                    patient: patient,
                    date: sessionDate.toISOString(),
                    time: formattedTime,
                    operationalStatus: 'agendado',
                    clinicalStatus: 'pendente',
                    notes: notes || 'Sessão terapêutica agendada',
                    specialty: session.package.sessionType.toLowerCase(),
                    duration: 40,
                    metadata: {
                        sessionId: session._id.toString(),
                        packageId: session.package._id.toString()
                    }
                };

                console.log('Payload corrigido:', JSON.stringify(appointmentData, null, 2));

                console.log(`requiiiii-----------------------`, appointmentData)
                const authHeader = req.headers.authorization;
                const headers = {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                };

                try {
                    // Novo agendamento
                    let appointmentId = session.appointmentId;

                    // Se não tem appointmentId, tenta encontrar existente
                    if (!appointmentId) {
                        const existingAppointment = await Appointment.findOne({
                            'metadata.sessionId': session._id.toString()
                        });

                        if (existingAppointment) {
                            appointmentId = existingAppointment._id;
                            session.appointmentId = appointmentId;
                            await session.save({ session: mongoSession });
                        }
                    }

                    if (appointmentId) {
                        // ATUALIZAÇÃO
                        await axios.put(
                            `${APPOINTMENTS_API_BASE_URL}/appointments/${appointmentId}`,
                            appointmentData,
                            { headers, timeout: 5000 }
                        );
                        session.status = 'scheduled';
                        session.operationalStatus = 'agendado';

                    } else {
                        // CRIAÇÃO
                        const response = await axios.post(
                            `${APPOINTMENTS_API_BASE_URL}/appointments`,
                            appointmentData,
                            { headers, timeout: 5000 }
                        );
                        session.appointmentId = response.data.id;
                        session.operationalStatus = 'agendado';
                        session.status = 'scheduled';
                    }

                    // Atualiza campos comuns
                    session.date = sessionDate;
                    session.sessionType = session.package.sessionType;
                    session.doctor = new mongoose.Types.ObjectId(doctorId);
                    session.patient = patient;
                    session.notes = notes || session.notes;

                    await session.save({ session: mongoSession });
                    await mongoSession.commitTransaction();

                    res.json(session);

                } catch (axiosError) {
                    console.log(axiosError)
                    if (axiosError.response) {
                        const errorDetails = axiosError.response.data?.message ||
                            axiosError.response.data?.error ||
                            JSON.stringify(axiosError.response.data);

                        if (axiosError.response.status === 409) {
                            throw new Error(`Conflito de horário: ${errorDetails}`);
                        }
                        throw new Error(`API de agendamentos: ${errorDetails}`);
                    }
                    throw axiosError;
                }

            } catch (error) {
                console.error("Erro na transação:", error);
                if (mongoSession.inTransaction()) {
                    await mongoSession.abortTransaction();
                }
                res.status(400).json({
                    error: error.message,
                    code: error.response?.status || 500
                });
            } finally {
                await mongoSession.endSession();
            }
        },

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
            // 5. Processar pagamento (se existir)
            if (payment?.amount > 0) {
                if (!payment.method || !validateInputs.paymentMethod(payment.method)) {
                    throw new Error("Método de pagamento inválido.");
                }

                const newPayment = new Payment({
                    amount: payment.amount,
                    paymentMethod: payment.method,
                    package: updatedPackage._id,
                    session: sessionDoc._id,
                    patient: updatedPackage.patient,
                    doctor: updatedPackage.doctor
                });

                await newPayment.save({ session: mongoSession });

                // Atualizar isPaid na sessão
                await Session.findByIdAndUpdate(
                    sessionId,
                    { isPaid: true }, // <--- Campo novo aqui
                    { session: mongoSession }
                );

                updatedPackage.totalPaid += payment.amount;
                updatedPackage.balance = Math.max(
                    (updatedPackage.sessionValue * updatedPackage.totalSessions) - updatedPackage.totalPaid,
                    0
                );

                await updatedPackage.save({ session: mongoSession });
            }

            await mongoSession.commitTransaction();

            const finalPackage = await Package.findById(updatedPackage._id)
                .populate({
                    path: 'sessions',
                    select: 'date status doctor isPaid'
                })
                .populate('payments patient doctor');

            res.json(finalPackage);

        } catch (error) {
            await mongoSession.abortTransaction();
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