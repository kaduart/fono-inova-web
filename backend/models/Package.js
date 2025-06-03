import mongoose from 'mongoose';
//delete mongoose.connection.models['Package'];
const packageSchema = new mongoose.Schema({
    version: { type: Number, default: 0 },
    durationMonths: { // Novo campo (1-12)
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    sessionsPerWeek: { // Novo campo (1-5)
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Profissional é obrigatório'],
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
    sessionValue: {
        type: Number,
        required: false,
        default: 200,
        min: [0.01, 'O valor deve ser maior que zero']
    },
    totalSessions: {
        type: Number,
        required: false,
        default: 1,
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
    credit: {
        type: Number,
        default: 0
    },
});

packageSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.$inc) {
        update.$inc.version = 1; // Incrementa a versão em todas as atualizações
    }
    next();
});

packageSchema.pre('save', function (next) {

    // Calcular total de sessões (4 semanas ≈ 1 mês)
    this.totalSessions = this.durationMonths * 4 * this.sessionsPerWeek;

    // Definir valor por sessão
    this.sessionValue = this.durationMonths > 2 ? 180 : 200;

    // Calcular valor total do pacote
    this.balance = (this.totalSessions * this.sessionValue) - this.totalPaid;

    next();
});

packageSchema.set('strict', 'throw');
const Package = mongoose.model('Package', packageSchema);
export default Package;
