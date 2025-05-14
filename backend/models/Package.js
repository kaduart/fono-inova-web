import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Profissional é obrigatório'], // Mensagem clara
        validate: {
            validator: async (value) => {
                const doctor = await mongoose.model('Doctor').findById(value);
                return !!doctor;
            },
            message: 'Profissional inválido ou não encontrado'
        }
    },
    paymentMethod: {
        type: String,
        required: false,
    },
    paymentType: {
        type: String,
        required: false,
    },
    sessionType: {
        type: String,
        enum: ['fonoaudiologia', 'terapeuta ocupacional', 'psicologia', 'fisioterapia'],
        required: true
    },
    totalSessions: {
        type: Number,
        required: true,
        min: [1, 'Deve ter pelo menos 1 sessão']
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
    sessionsDone: {
        type: Number,
        default: 0
    },
    sessionValue: {
        type: Number,
        required: true,
        min: [0.01, 'O valor deve ser maior que zero']
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }],
    status: {
        type: String,
        enum: ['active', 'in-progress', 'completed'],
        default: 'active'
    },
    totalPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
});

// Atualização automática do status
// models/Package.js
packageSchema.pre('save', async function (next) {
    // 1. Atualização do status
    if (this.isModified('sessionsDone') || this.isModified('totalPaid')) {
        let newStatus = 'active';

        if (this.sessionsDone >= this.totalSessions) {
            newStatus = 'completed';
        } else if (this.sessionsDone > 0) {
            newStatus = 'in-progress';
        }

        if (this.status !== newStatus) {
            this.status = newStatus;
        }
    }

    // 2. Cálculo do balance (redundante, mas seguro)
    if (this.isModified('totalPaid')) {
        this.balance = Math.max(
            (this.sessionValue * this.totalSessions) - this.totalPaid,
            0
        );
    }

    next();
});
/* packageSchema.pre('save', async function (next) {
    if (this.isNew) { // Executa apenas na criação do pacote
        const Session = mongoose.model('Session');
        const sessions = [];

        // Criar sessões automaticamente
        for (let i = 0; i < this.totalSessions; i++) {
            const session = new Session({
                date: new Date(), // Data inicial (ajustável posteriormente)
                sessionType: this.sessionType,
                value: this.sessionValue,
                package: this._id, // Associa ao ID do pacote
                status: 'pending',
                isPaid: false,
                paymentMethod: null
            });
            await session.save();
            sessions.push(session._id);
        }

        this.sessions = sessions; // Atribui as sessões ao pacote
        this.status = 'active'; // Status inicial padrão
    }

    // Atualização do status baseada em sessões pagas (após criação)
    const paidSessions = await Session.countDocuments({
        package: this._id,
        isPaid: true
    });

    if (this.isModified('totalPaid')) {
        const totalValue = this.totalSessions * this.sessionValue;
        this.balance = totalValue - this.totalPaid;
        if (paidSessions >= this.totalSessions) {
            this.status = 'completed';
        } else if (paidSessions > 0) {
            this.status = 'in-progress';
        } else {
            this.status = 'active';
        }
    }

    next();
}); */
packageSchema.set('strict', 'throw');
const Package = mongoose.model('Package', packageSchema);
export default Package;
