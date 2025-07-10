// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        validate: {
            validator: function (date) {
                if (!date) return true; // Permite null

                const now = new Date();
                return date >= new Date(now.setHours(0, 0, 0, 0));
            },
            message: "A data e hora do agendamento devem ser posteriores ao momento atual."
        }
    },
    sessionType: {
        type: String,
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        default: null,
        required: false
    },
    doctor: {
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
    },
    isPaid: { type: Boolean, default: false },
    paymentMethod: {
        type: String,
        enum: ['dinheiro', 'pix', 'cartão'],
        default: null
    },
    session: String,
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'canceled', 'scheduled'],
            message: 'Status inválido para sessão'
        },
    },
    confirmedAbsence: {
        type: Boolean,
        default: null,
        validate: {
            validator: function (value) {
                // Campo obrigatório apenas quando status é 'canceled'
                return this.status !== 'canceled' || value !== null;
            },
            message: 'confirmedAbsence é obrigatório para sessões canceladas'
        }
    },
    notes: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// models/Session.js
sessionSchema.post('save', async function (doc, next) {
    try {
        const Package = mongoose.model('Package');
        const Appointment = mongoose.model('Appointment');

        // Verifica se a transação ainda está ativa
        const session = doc.$session();
        const inTransaction = session && session.inTransaction();

        // Atualiza o pacote se a sessão foi completada
        if (doc.isModified('status') && doc.status === 'completed') {
            const updateOp = Package.findOneAndUpdate(
                { _id: doc.package },
                { $inc: { sessionsDone: 1 } },
                { session: inTransaction ? session : null }
            );

            if (inTransaction) {
                await updateOp;
            } else {
                updateOp.exec();
            }
        }

        // Sincroniza dados no Appointment
        if (doc.appointmentId) {
            const appointmentUpdate = {
                date: doc.date,
                doctor: doc.doctor,
                notes: doc.notes,
                sessionType: doc.sessionType,
                'payment.method': doc.paymentMethod
            };

            // Mapeia CORRETAMENTE o status da sessão para o status do appointment
            if (doc.status === 'completed') {
                // Valores CORRETOS para operationalStatus
                appointmentUpdate.operationalStatus = 'pago'; // ou 'confirmado' conforme necessário
                appointmentUpdate.clinicalStatus = 'concluído';
            } else if (doc.status === 'canceled') {
                appointmentUpdate.operationalStatus = 'cancelado';
                appointmentUpdate.clinicalStatus = 'faltou';
            } else {
                appointmentUpdate.operationalStatus = 'agendado';
                appointmentUpdate.clinicalStatus = 'pendente';
            }

            const updateOp = Appointment.findByIdAndUpdate(
                doc.appointmentId,
                appointmentUpdate,
                { session: inTransaction ? session : null }
            );

            if (inTransaction) {
                await updateOp;
            } else {
                updateOp.exec();
            }
        }

        next();
    } catch (error) {
        console.error('Erro no hook post-save:', error);
        next(error);
    }
});


/* sessionSchema.pre('save', function (next) {
    if (this.status === 'completed' && !this.isPaid) {
        return res.status(400).json({ error: 'Sessão não pode ser marcada como concluída sem pagamento.' });
    }

    next();
}); */


const Session = mongoose.model('Session', sessionSchema);

export default Session;