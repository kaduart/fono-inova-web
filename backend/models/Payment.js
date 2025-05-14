import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true,
        index: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    paymentMethod: {
        type: String,
        enum: ['dinheiro', 'pix', 'cartão'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Middleware de pré-validação
paymentSchema.pre('validate', function (next) {
    console.log(`Validando pagamento para pacote ${this.package}`);
    next();
});

// Middleware de pós-salvamento FORTALECIDO
/* paymentSchema.post('save', async function (doc) {
    try {
        console.log(`Iniciando hook pós-salvamento para pagamento ${doc._id}`);

        const result = await mongoose.model('Package').updateOne(
            { _id: doc.package },
            {
                $inc: {
                    totalPaid: doc.amount,
                    balance: -doc.amount
                },
                $push: { payments: doc._id }
            }
        );

        console.log(`Pagamento ${doc._id} vinculado ao pacote ${doc.package}`, {
            matched: result.matchedCount,
            modified: result.modifiedCount
        });
    } catch (err) {
        console.error(`FALHA no hook de pagamento ${doc._id}:`, {
            message: err.message,
            stack: err.stack
        });
    }
}); */

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;