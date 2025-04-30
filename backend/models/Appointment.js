import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['agendado', 'concluído', 'cancelado'], default: 'agendado' },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
