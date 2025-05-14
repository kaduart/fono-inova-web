import express from 'express';
import mongoose from 'mongoose';
import { adminOrSecretary, auth } from '../middleware/auth.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { patientId, professional, sessionType, totalSessions, sessionValue, initialPayment, paymentMethod } = req.body;

        // 1. Verificar conexão com o MongoDB
        const dbState = mongoose.connection.readyState;
        if (dbState !== 1) {
            throw new Error(`Conexão com MongoDB não está ativa (estado: ${dbState})`);
        }

        // Validação robusta
        const missingFields = [];
        if (!patientId) missingFields.push('patientId');
        if (!professional) missingFields.push('professional');
        if (!sessionType) missingFields.push('sessionType');
        if (!totalSessions) missingFields.push('totalSessions');
        if (!sessionValue) missingFields.push('sessionValue');

        if (missingFields.length > 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: 'Campos obrigatórios faltando',
                missingFields,
                received: req.body
            });
        }

        // 1. Criar Pacote primeiro para garantir o ID
        const packageData = {
            patient: patientId,
            sessionType,
            professional,
            paymentMethod,
            totalSessions: Number(totalSessions),
            sessionValue: Number(sessionValue),
            status: 'active',
            totalPaid: 0,
            balance: Number(sessionValue) * Number(totalSessions),
            sessionsDone: 0,
            payments: []
        };
        const [newPackage] = await Package.create([packageData], { session });

        // Verificação crítica
        if (!newPackage || !newPackage._id) {
            throw new Error('Erro ao criar pacote: ID não gerado');
        }

        // 2. Criar Sessões
        const sessions = await Session.create(
            Array.from({ length: totalSessions }, () => ({
                date: new Date(),
                professional,
                sessionType,
                value: sessionValue,
                package: newPackage._id,
                status: 'pending'
            })),
            { session }
        );

        // 3. Atualizar Pacote com IDs das sessões
        await Package.findByIdAndUpdate(
            newPackage._id,
            { $set: { sessions: sessions.map(s => s._id) } },
            { session }
        );

        // 4. Processar Pagamento Inicial (se existir)
        if (initialPayment > 0) {
            console.log('Processando pagamento inicial...');
            const paymentAmount = Math.min(
                Number(initialPayment),
                newPackage.balance // Garante que não pague mais que o saldo
            );

            if (paymentAmount <= 0) {
                throw new Error('Valor de pagamento inicial inválido');
            }

            const paymentData = {
                amount: paymentAmount,
                paymentMethod,
                package: newPackage._id,
                session: sessions[0]?._id
            };
            console.log('Dados do pagamento:', paymentData);


            // 4.1 Criar pagamento COM a sessão atual
            const [payment] = await Payment.create([paymentData], { session });
            console.log('Pagamento criado:', payment._id);

            // Verificação IMEDIATA no banco
            const paymentInDB = await Payment.findById(payment._id).session(session);
            if (!paymentInDB) {
                throw new Error('Pagamento não foi persistido no banco de dados');
            }
            // 4.2 Atualização ATÔMICA do pacote
            await Package.updateOne(
                { _id: newPackage._id },
                {
                    $push: { payments: payment._id },
                    $inc: { totalPaid: paymentAmount },
                    $set: { balance: newPackage.balance - paymentAmount }
                },
                { session }
            );

            const updatedPackage = await Package.findById(newPackage._id).populate('payments');
            console.log('Pacote atualizado após pagamento:', updatedPackage);

            const result = await Package.findById(newPackage._id)
                .populate({
                    path: 'payments',
                    select: '_id amount paymentMethod createdAt'
                })
                .populate('sessions')
                .lean();

            console.log('Pacote final após criação:', {
                payments: result.payments?.map(p => p._id) || [],
                totalPaid: result.totalPaid,
                balance: result.balance
            });

            // DEBUG CRÍTICO
            console.log('Pagamento registrado:', {
                paymentId: payment._id,
                packagePayments: updatedPackage.payments,
                totalPaid: updatedPackage.totalPaid
            });
        }

        await session.commitTransaction();

        // Recarregar o pacote com todos os relacionamentos
        const result = await Package.findById(newPackage._id)
            .populate('payments sessions')
            .lean();

        const finalPackage = await Package.findById(newPackage._id)
            .populate('payments sessions')
            .lean();
        // DEBUG FINAL
        console.log('Resultado final----------------------------------------------------------:', {
            payments: result.payments.map(p => p._id),
            totalPaid: result.totalPaid,
            balance: result.balance
        });

        res.status(201).json(result);

    } catch (err) {
        await session.abortTransaction();
        console.error('Erro completo:', {
            message: err.message,
            stack: err.stack
        });
        handleError(res, err);
    } finally {
        session.endSession();
    }
});

// Obter Pacote por ID:
router.get('/:id', auth, async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id).populate('sessions');
        if (!packageData) return res.status(404).json({ message: 'Pacote não encontrado' });
        res.status(200).json(packageData);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter pacote', error: err.message });
    }
});

// Atualizar um pacote existente
router.patch('/:id', auth, async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Pacote não encontrado' });
        }

        // Status será atualizado automaticamente pelo pre-save hook
        res.status(200).json(updatedPackage);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar pacote', error: err.message });
    }
});

// Atualizar o status de um pacote com base nos pagamentos
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id);
        if (!packageData) return res.status(404).json({ message: 'Pacote não encontrado' });

        // Nova lógica baseada no novo enum
        if (packageData.status === 'active' && req.body.status === 'completed') {
            packageData.status = 'completed';
            await packageData.save();
            return res.status(200).json({ message: 'Pacote marcado como completo' });
        }

        res.status(400).json({ message: 'Transição de status inválida' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar status', error: err.message });
    }
});

// Listar todos os pacotes com o status de pagamento das sessões
// routes/Package.js
router.get('/', auth, adminOrSecretary, async (req, res) => {
    try {
        const packages = await Package.find()
            .populate({
                path: 'sessions',
                select: 'date status professional'
            })
            .populate({
                path: 'payments',
                select: 'amount date paymentMethod'
            })
            .lean(); // Convert para objetos simples

        // Adiciona campos calculados
        const enhancedPackages = packages.map(pkg => ({
            ...pkg,
            remaining: pkg.totalSessions - pkg.sessionsDone,
            totalValue: pkg.sessionValue * pkg.totalSessions
        }));

        res.status(200).json(enhancedPackages);
    } catch (err) {
        res.status(500).json({
            message: 'Erro ao listar pacotes',
            error: err.message
        });
    }
});

// Deletar um pacote
router.delete('/:id', auth, async (req, res) => {
    try {
        const packageData = await Package.findByIdAndDelete(req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: 'Pacote não encontrado' });
        }
        res.status(200).json({ message: 'Pacote deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar pacote', error: err.message });
    }
});

// remover sessoa de um pacote
router.patch('/:id/remove-session', auth, async (req, res) => {
    try {
        const { sessionId } = req.body;
        const packageData = await Package.findById(req.params.id);
        if (!packageData) return res.status(404).json({ message: 'Pacote não encontrado' });

        packageData.sessions = packageData.sessions.filter(
            session => session.toString() !== sessionId
        );
        await packageData.save();
        res.status(200).json(packageData);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover sessão', error: err.message });
    }
});

//Consultar Pacotes por Filtro:
router.get('/search', auth, async (req, res) => {
    const { status, type, startDate, endDate } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (startDate && endDate) {
        filters.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const packages = await Package.find(filters).populate('sessions');
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar pacotes', error: err.message });
    }
});

// Registrar sessão utilizada em um pacote
router.patch('/:id/use-session', auth, async (req, res) => {
    try {
        const packageId = req.params.id; // Assumindo que o ID do pacote vem da URL
        const { sessionId, date, professional, sessionType, notes, payment } = req.body;

        const pkg = await Package.findById(packageId).populate('sessions').populate('patient'); // Popule o paciente também
        if (!pkg) return res.status(404).json({ error: 'Pacote não encontrado' });

        let sessionToUse;

        if (sessionId) {
            // Se um sessionId é fornecido, tentamos encontrar essa sessão no pacote
            sessionToUse = pkg.sessions.find(s => s._id.toString() === sessionId);
            if (!sessionToUse) {
                // Se não encontrar, pode ser uma sessão que não pertence ao pacote ou ID inválido
                // Alternativamente, carregar a sessão diretamente pelo ID para verificar se existe
                sessionToUse = await Session.findById(sessionId);
                if (!sessionToUse) return res.status(404).json({ error: 'Sessão específica não encontrada.' });
                // Verificar se a sessão realmente pertence ao pacote, se necessário
                if (sessionToUse.packageId.toString() !== packageId) {
                    return res.status(400).json({ error: 'Sessão não pertence a este pacote.' });
                }
            }
        } else {
            // Se sessionId não for fornecido, criar uma nova sessão
            sessionToUse = new Session({
                packageId: pkg._id,
                date: new Date(date),
                professional: professional, // ID do profissional que realizou a sessão
                sessionType: sessionType,
                value: pkg.sessionValue,
                status: 'completed', // Marcar como concluída ao usar
                notes: notes
            });
            await sessionToUse.save({ session });
            await pkg.save({ session });
        }

        // Atualizar status da sessão para 'completed'
        // Se sessionToUse foi carregado via populate, a modificação abaixo pode não persistir sem salvar o documento Session individualmente
        // É mais seguro atualizar o documento Session diretamente
        await Session.findByIdAndUpdate(sessionToUse._id, { status: 'completed', notes: notes || sessionToUse.notes });

        // Atualizar sessionsDone no pacote
        // Contar sessões concluídas diretamente do BD pode ser mais robusto
        const completedSessionsCount = await Session.countDocuments({ packageId: pkg._id, status: 'completed' });
        pkg.sessionsDone = completedSessionsCount;

        // Registrar pagamento se fornecido
        if (payment && payment.amount > 0) {
            if (!payment.method || !validateInputs.paymentMethod(payment.method)) {
                return res.status(400).json({ error: 'Método de pagamento da sessão inválido' });
            }
            const newPayment = new Payment({
                packageId: pkg._id,
                sessionId: sessionToUse._id,
                patientId: pkg.patient._id, // Usar o ID do paciente do pacote populado
                professional: professional, // ID do profissional que realizou a sessão
                amount: payment.amount,
                paymentMethod: payment.method,
                date: new Date(),
                notes: `Pagamento referente à sessão de ${sessionType} em ${new Date(date).toLocaleDateString()}`
            });
            await newPayment.save();
            pkg.payments.push(newPayment._id);
            pkg.totalPaid = (pkg.totalPaid || 0) + payment.amount;
        }

        await pkg.save(); // Salva o pacote com sessionsDone e payment atualizados. O hook pre-save recalcula status e balance.

        // Retornar o pacote atualizado com a sessão utilizada
        const updatedPackage = await Package.findById(packageId).populate('sessions').populate('payments').populate('patient');
        res.json(updatedPackage);

    } catch (error) {
        console.error('Erro ao usar sessão:', error);
        res.status(400).json({ error: error.message });
    }
    finally {
        session.endSession();
    }
});


async function processSession(sessionId, packageId, sessionData, session) {
    if (sessionId) {
        return await Session.findOneAndUpdate(
            { _id: sessionId, package: packageId },
            { $set: { ...sessionData, status: 'used', usedAt: new Date() } },
            { new: true, session }
        );
    } else {
        const newSession = new Session({
            ...sessionData,
            package: packageId,
            status: 'used',
            usedAt: new Date()
        });
        return await newSession.save({ session });
    }
}

async function processPayment(payment, packageId, sessionId, session) {
    const packageData = await Package.findById(packageId).session(session);

    const [newPayment] = await Payment.create([{
        amount: payment.amount,
        paymentMethod: payment.method,
        package: packageId,
        session: sessionId
    }], { session });

    await Package.findByIdAndUpdate(
        packageId,
        {
            $push: { payments: newPayment._id },
            $inc: { totalPaid: payment.amount },
            $set: {
                balance: Math.max(
                    packageData.sessionValue * packageData.totalSessions -
                    packageData.totalPaid - payment.amount,
                    0
                )
            }
        },
        { session }
    );

    await Session.findByIdAndUpdate(
        sessionId,
        { $set: { isPaid: true, paymentMethod: payment.method } },
        { session }
    );
}

// Função auxiliar
const calculatePackageStatus = (sessionsDone, totalSessions) => {
    if (sessionsDone >= totalSessions) return 'completed';
    if (sessionsDone > 0) return 'in-progress';
    return 'active';
};

router.post('/:id/payments', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, paymentMethod, coveredSessions } = req.body;
        const packageSelect = await Package.findById(req.params.id).session(session);

        // Validar sessões
        const validSessions = await Session.find({
            _id: { $in: coveredSessions },
            package: packageSelect._id,
            isPaid: false
        }).session(session);

        if (validSessions.length !== coveredSessions.length) {
            throw new Error('Algumas sessões são inválidas ou já pagas');
        }

        // Atualizar sessões
        await Session.updateMany(
            { _id: { $in: coveredSessions } },
            { $set: { isPaid: true, paymentMethod } },
            { session: session }
        );

        // Criar pagamento
        const payment = await Payment.create([{
            amount,
            paymentMethod,
            coveredSessions,
            package: packageSelect._id
        }], { session: session })[0];

        // Atualizar pacote
        const updatedPackage = await Package.findByIdAndUpdate(
            packageSelect._id,
            {
                $push: { payments: payment._id },
                $inc: { totalPaid: amount },
                $set: {
                    balance: Math.max(packageSelect.balance - amount, 0)
                }
            },
            { new: true, session: session }
        ).populate('sessions payments');

        await session.commitTransaction();
        res.status(201).json(updatedPackage);
    } catch (err) {
        await session.abortTransaction();
        handleError(res, err);
    } finally {
        session.endSession();
    }
});

// Função auxiliar para tratamento de erros
const handleError = (res, err) => {
    console.error('Erro:', err);

    const response = {
        message: 'Erro na operação',
        error: process.env.NODE_ENV === 'production'
            ? 'Contacte o administrador'
            : err.message
    };

    if (err.name === 'ValidationError') {
        response.details = Object.values(err.errors).map(e => e.message);
        return res.status(400).json(response);
    }

    if (err.name === 'CastError') {
        response.message = 'ID com formato inválido';
        return res.status(400).json(response);
    }

    res.status(500).json(response);
};


export default router;
