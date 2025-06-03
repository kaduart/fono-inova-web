// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        validate: {
            validator: function (date) {
                if (!date) return true; // Permite null
                const now = new Date();
                // Compara se a data é futura (mesmo dia com horário adiante)
                return date.getTime() > now.getTime();
            },
            message: "O horário deve ser futuro, mesmo que seja hoje"
        }
    },
    sessionType: {
        type: String,
        required: true // se quiser obrigar
    },

    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // String, não importe o modelo aqui!
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package', // String
        required: true
    },
    isPaid: { type: Boolean, default: false },
    paymentMethod: {
        type: String,
        enum: ['dinheiro', 'pix', 'cartão'],
        default: null
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'canceled', 'schedule'],
            message: 'Status inválido para sessão'
        },
        default: 'pending'
    },
    notes: { type: String },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

sessionSchema.post('save', async function (doc) {
    const Package = mongoose.model('Package');
    const Appointment = mongoose.model('Appointment');

    // Atualiza o pacote se a sessão foi completada
    if (doc.isModified('status') && doc.status === 'completed') {
        try {
            await Package.findOneAndUpdate(
                { _id: doc.package },
                { $inc: { sessionsDone: 1 } }
            );
        } catch (error) {
            console.error('Erro ao atualizar o pacote:', error);
        }
    }

    // Sincroniza dados no Appointment
    if (doc.appointmentId) {
        try {
            await Appointment.findByIdAndUpdate(doc.appointmentId, {
                date: doc.date,
                professional: doc.professional,
                notes: doc.notes,
                status: doc.status,
                sessionType: doc.sessionType, // se estiver no model Session
                'payment.method': doc.paymentMethod
            });
        } catch (error) {
            console.error('Erro ao sincronizar agendamento:', error);
        }
    }
});


sessionSchema.pre('save', function (next) {
    if (this.status === 'completed' && !this.isPaid) {
        return res.status(400).json({ error: 'Sessão não pode ser marcada como concluída sem pagamento.' });
    }

    next();
});


const Session = mongoose.model('Session', sessionSchema);

export default Session;