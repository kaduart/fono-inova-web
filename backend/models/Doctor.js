// models/doctorModel.js
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  active: { type: String, required: true },
  role: { type: String, default: 'doctor' }
});

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
