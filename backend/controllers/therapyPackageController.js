import Packages from '../models/Package.js';

const validateInputs = {
    sessionType: (type) => ['fonoaudiologia', 'terapeuta ocupacional', 'psicologia', 'fisioterapia'].includes(type),
    paymentMethod: (method) => ['dinheiro', 'pix', 'cartão'].includes(method),
    paymentType: (type) => ['full', 'per-session', 'partial'].includes(type)
};

// Operações CRUD Completas
export const packageOperations = {
    // Criar
    create: async (req, res) => {
        try {
            const { patientId, totalSessions, sessionType, paymentType, sessionValue } = req.body;

            if (!validateInputs.sessionType(sessionType)) {
                return res.status(400).json({ error: 'Tipo de sessão inválido' });
            }

            const newPackage = await Packages.create({
                patientId,
                totalSessions,
                sessionType,
                paymentType,
                sessionValue
            });

            res.status(201).json(newPackage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Ler
    get: {
        all: async (req, res) => {
            try {
                const packages = await Packages.find()
                    .populate('patientId', 'name')
                    .sort({ createdAt: -1 });
                res.json(packages);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        byId: async (req, res) => {
            try {
                const pkg = await Packages.findById(req.params.id)
                    .populate('patientId', 'name');
                if (!pkg) return res.status(404).json({ error: 'Pacote não encontrado' });
                res.json(pkg);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    },

    // Atualizar
    update: {
        package: async (req, res) => {
            try {
                const updated = await Packages.findByIdAndUpdate(
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
            try {
                const pkg = await Packages.findOneAndUpdate(
                    { 'sessions._id': req.params.sessionId },
                    { $set: { 'sessions.$': req.body } },
                    { new: true }
                );
                res.json(pkg);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    },

    // Deletar
    delete: {
        package: async (req, res) => {
            try {
                await Packages.findByIdAndDelete(req.params.id);
                res.status(204).send();
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        session: async (req, res) => {
            try {
                const pkg = await Packages.findByIdAndUpdate(
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
            const pkg = await Packages.findByIdAndUpdate(
                req.params.id,
                { $push: { sessions: req.body } },
                { new: true, runValidators: true }
            );
            res.json(pkg);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    registerPayment: async (req, res) => {
        try {
            const { amount, paymentMethod, coveredSessions } = req.body;

            const pkg = await Packages.findById(req.params.id);
            const invalidSessions = coveredSessions.filter(id =>
                !pkg.sessions.some(s => s._id.equals(id))
            );

            if (invalidSessions.length > 0) {
                return res.status(400).json({
                    error: 'Sessões inválidas',
                    invalidSessions
                });
            }

            const updated = await Packages.findByIdAndUpdate(
                req.params.id,
                { $push: { payments: { ...req.body, date: new Date() } } },
                { new: true }
            );

            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

// Operação de Atualização de Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatus = ['active', 'finished', 'canceled'];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }

        const updated = await Packages.findByIdAndUpdate(
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
        const packages = await Packages.find()
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
        const packages = await Packages.findById(req.params.id)
            .populate('patientId', 'name birthDate'); // Campos necessários

        if (!packages) return res.status(404).json({ error: 'Pacote não encontrado' });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
}