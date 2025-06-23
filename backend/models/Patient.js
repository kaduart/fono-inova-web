import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    birthCertificate: { type: String },
    gender: { type: String, trim: true },
    maritalStatus: { type: String, trim: true },
    profession: { type: String, trim: true },
    placeOfBirth: { type: String, trim: true },
    address: {
        street: { type: String, trim: true },
        number: { type: String, trim: true },
        district: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
    },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, lowercase: true },
    cpf: {
        type: String, trim: true, index: false, // Isso previne a criação automática de índice
        default: undefined
    },
    rg: {
        type: String, trim: true, index: false, // Isso previne a criação automática de índice
        default: undefined
    },
    mainComplaint: { type: String, trim: true },
    clinicalHistory: { type: String, trim: true },
    medications: { type: String, trim: true },
    allergies: { type: String, trim: true },
    familyHistory: { type: String, trim: true },
    healthPlan: {
        name: { type: String, trim: true },
        policyNumber: { type: String, trim: true },
    },
    legalGuardian: { type: String, trim: true },
    emergencyContact: {
        name: { type: String, trim: true },
        phone: { type: String, trim: true },
        relationship: { type: String, trim: true },
    },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    imageAuthorization: { type: Boolean, default: false },
}, { timestamps: true });



const Patient = mongoose.model('Patient', patientSchema, 'patients');

export default Patient;
