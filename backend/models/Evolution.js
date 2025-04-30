import mongoose from 'mongoose';

const evolutionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    evaluationTypes: [{
        type: String,
        enum: ['language', 'motor', 'cognitive', 'behavior', 'social'],
        required: true
    }],
    metrics: {
        type: Map,
        of: Number
    },
    observations: String,
    treatmentStatus: {
        type: String,
        enum: ['initial_evaluation', 'in_progress', 'improving', 'stable', 'regressing', 'completed'],
        default: 'in_progress'
    }
}, { timestamps: true });

const Evolution = mongoose.model('Evolution', evolutionSchema);

export default Evolution;