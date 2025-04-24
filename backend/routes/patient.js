// routes/patient.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.js';

const router = express.Router();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token format invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta');
    req.user = decoded; // por ex: { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/add', auth, async (req, res) => {
  console.log('HEADERS RECEBIDOS:', req.headers);
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized to add patients' });
  }

  const {
    fullName,
    dateOfBirth,
    gender,
    maritalStatus,
    profession,
    placeOfBirth,
    address,
    phone,
    email,
    cpf,
    rg,
    specialties,
    mainComplaint,
    clinicalHistory,
    medications,
    allergies,
    familyHistory,
    healthPlan,
    legalGuardian,
    emergencyContact,
    imageAuthorization,
  } = req.body;

  try {
    const patient = new Patient({
      fullName,
      dateOfBirth,
      gender,
      maritalStatus,
      profession,
      placeOfBirth,
      address,
      phone,
      email,
      cpf,
      rg,
      specialties,
      mainComplaint,
      clinicalHistory,
      medications,
      allergies,
      familyHistory,
      healthPlan,
      legalGuardian,
      emergencyContact,
      imageAuthorization,
    });

    await patient.save();
    res.status(201).json({ message: 'Patient added successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email, CPF or RG already exist!' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Obter paciente por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Atualizar paciente por ID
router.put('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all patients
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a patient
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
