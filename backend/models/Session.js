// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // String, não importe o modelo aqui!
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
        enum: ['pending', 'used', 'canceled', 'paid', 'partial'],
        default: 'pending'
    }
});

// Defina o modelo apenas uma vez
const Session = mongoose.model('Session', sessionSchema);

export default Session;