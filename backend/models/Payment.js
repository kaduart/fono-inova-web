import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true,
    },
    professional: {
        type: String,
        required: true,
    },
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
    notes: {
        type: String,
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

paymentSchema.post('save', async function (doc) {
    const session = this.$session && this.$session();

    const withRetry = async (operation, maxRetries = 3, delayMs = 100) => {
        let retries = 0;
        while (retries < maxRetries) {
            try {
                return await operation();
            } catch (err) {
                if (err.message.includes('Write conflict')) {
                    retries++;
                    await new Promise(r => setTimeout(r, delayMs));
                } else {
                    throw err;
                }
            }
        }
        throw new Error(`Falha após ${maxRetries} tentativas`);
    };

    await withRetry(async () => {
        const Package = mongoose.model('Package');
        const Session = mongoose.model('Session');

        // 1. Atualização Atômica do Pacote
        const pkg = await Package.findOneAndUpdate(
            { _id: doc.package },
            {
                $inc: { totalPaid: doc.amount },
                $push: { payments: doc._id }
            },
            { new: true, session }
        );

        if (!pkg || pkg.sessionValue <= 0) {
            throw new Error("Pacote ou valor da sessão inválido");
        }

        // 2. Cálculo de Sessões Pagas e Crédito
        const totalValue = pkg.sessionValue * pkg.totalSessions;
        const sessionsPaidCount = Math.floor(pkg.totalPaid / pkg.sessionValue);

        // 3. Busca e Atualização de Sessões
        const sessionsToAutoPay = await Session.find({
            package: pkg._id,
            isPaid: false
        })
            .sort({ createdAt: 1 })
            .limit(sessionsPaidCount)
            .select('_id');

        if (sessionsToAutoPay.length > 0) {
            await Session.updateMany(
                { _id: { $in: sessionsToAutoPay.map(s => s._id) } },
                {
                    isPaid: true,
                    paymentMethod: doc.paymentMethod,
                    status: 'paid'
                },
                { session }
            );
        }

        if (sessionsToAutoPay.length > 0) {
            await Session.updateMany(
                { _id: { $in: sessionsToAutoPay.map(s => s._id) } },
                {
                    isPaid: true,
                    paymentMethod: doc.paymentMethod,
                    status: 'paid'
                },
                { session }
            );
        }

        // 5. Atualizar Saldo e Crédito
        await Package.findOneAndUpdate(
            { _id: doc.package },
            {
                $set: {
                    balance: Math.max(totalValue - pkg.totalPaid, 0)
                }
            },
            { session }
        );
    });
});


const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;