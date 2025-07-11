import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    serviceType: {
        type: String,
        enum: ['evaluation', 'session', 'package', 'individual_session'],
        required: true,
        default: 'session'
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: function () {
            return this.serviceType === 'package';
        },
        default: null
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        /*   required: function () {
              return this.serviceType === 'session' || this.serviceType === 'individual_session;
          } */
    },
    paymentMethod: {
        type: String,
        enum: ['dinheiro', 'pix', 'cartão'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'canceled'],
        default: 'pending'
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Middleware para pagamentos de pacote
paymentSchema.post('save', async function (doc) {
    // Executa apenas para pagamentos de pacote
    if (doc.serviceType !== 'package' || !doc.package) {
        return;
    }

    const session = this.$session && this.$session();
    const Package = mongoose.model('Package');
    const Session = mongoose.model('Session');

    const withRetry = async (operation, maxRetries = 3, delayMs = 100) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await operation();
            } catch (err) {
                if (err.message.includes('Write conflict')) {
                    if (i === maxRetries - 1) throw err;
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                } else {
                    throw err;
                }
            }
        }
    };

    try {
        await withRetry(async () => {
            // 1. Busca e valida o pacote
            const pkg = await Package.findById(doc.package).session(session || null);
            if (!pkg) {
                console.warn(`Pacote ${doc.package} não encontrado`);
                return;
            }

            // 2. Atualiza o pacote com o valor pago
            const updatedPkg = await Package.findOneAndUpdate(
                { _id: doc.package },
                {
                    $inc: { totalPaid: doc.amount },
                    $push: { payments: doc._id }
                },
                { new: true, session }
            );

            // 3. Cálculo de sessões que podem ser marcadas como pagas
            const sessionsPaidCount = Math.floor(updatedPkg.totalPaid / updatedPkg.sessionValue);
            const previouslyPaidCount = updatedPkg.payments.length - 1; // Excluindo o pagamento atual

            const newSessionsToPay = sessionsPaidCount - previouslyPaidCount;
            if (newSessionsToPay <= 0) {
                return;
            }

            // 4. Busca sessões não pagas para atualizar
            const sessionsToAutoPay = await Session.find({
                package: pkg._id,
                status: { $ne: 'paid' }
            })
                .sort({ createdAt: 1 })
                .limit(newSessionsToPay)
                .select('_id')
                .session(session || null);

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

            // 5. Atualiza saldo do pacote
            const totalValue = updatedPkg.sessionValue * updatedPkg.totalSessions;
            await Package.findOneAndUpdate(
                { _id: doc.package },
                {
                    $set: {
                        balance: Math.max(totalValue - updatedPkg.totalPaid, 0),
                        status: sessionsToAutoPay.length === 0 ? 'completed' : 'active'
                    }
                },
                { session }
            );
        });
    } catch (error) {
        console.error('Erro no pós-save do pagamento:', error);
    }
});

paymentSchema.pre('save', async function (next) {
    // Não processar para pagamentos de pacotes
    if (this.serviceType === 'package') {
        return next();
    }

    // Só processar se não tiver appointment associado
    if (!this.appointment) {
        try {
            // Buscar appointment correspondente
            const filter = {
                patient: this.patient,
                doctor: this.doctor,
                date: {
                    $gte: new Date(this.createdAt.getTime() - 3 * 24 * 60 * 60 * 1000),
                    $lte: new Date(this.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000)
                },
                payment: { $exists: false } // Só appointments sem pagamento
            };

            // Critérios adicionais por tipo de serviço
            if (this.serviceType === 'evaluation') {
                filter.specialty = { $exists: true };
                filter.operationalStatus = 'confirmado';
            } else if (this.serviceType === 'session') {
                filter.clinicalStatus = { $in: ['pendente', 'concluído'] };
            }

            const appointment = await mongoose.model('Appointment').findOne(filter);

            if (appointment) {
                this.appointment = appointment._id;

                // Atualização segura do appointment
                await mongoose.model('Appointment').findOneAndUpdate(
                    { _id: appointment._id },
                    {
                        $set: {
                            payment: this._id,
                            // Atualiza status apenas para sessões avulsas
                            ...(this.serviceType === 'session' && { operationalStatus: 'pago' })
                        }
                    }
                );
            }
        } catch (error) {
            // Logar erro sem interromper o fluxo
            console.error('Erro na associação automática:', {
                paymentId: this._id,
                error: error.message
            });
        }
    }
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;