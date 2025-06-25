import express from 'express';
import { auth } from '../middleware/auth.js';
import validateId from '../middleware/validateId.js';
import Appointment from '../models/Appointment.js';
import Package from '../models/Package.js';
import Patient from '../models/Patient.js';


const router = express.Router();

router.post('/add', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized to add patients' });
  }

  const {
    fullName,
    dateOfBirth,
    birthCertificate,
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
      birthCertificate,
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
router.get('/:id', validateId, auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Atualizar paciente por ID
router.put('/:id', validateId, auth, async (req, res) => {
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
router.delete('/:id', validateId, auth, async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Retorna resumo das consultas (última e próxima)
router.get('/:id/appointments-summary', validateId, auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar o paciente e verificar se existe
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Buscar agendamentos do paciente com as referências populadas
    const appointments = await Appointment.find({ patientId: id })
      .populate('patientId')  // Popula os dados do paciente (se necessário)
      .populate('doctorId')   // Popula os dados do médico (se necessário)
      .sort({ date: 1 });

    const now = new Date();

    // Filtrar as consultas passadas e futuras
    const pastAppointments = appointments.filter(a => new Date(a.date) < now);
    const futureAppointments = appointments.filter(a => new Date(a.date) >= now);

    // Obter o último agendamento passado e o próximo futuro
    const lastAppointment = pastAppointments.at(-1) || null;
    const nextAppointment = futureAppointments.at(0) || null;

    // Responder com as informações do último e próximo agendamento
    res.json({ lastAppointment, nextAppointment });

  } catch (err) {
    console.error('[ERRO] Detalhes do erro:', err);
    res.status(500).json({ message: 'Erro ao buscar consultas', error: err.message });
  }
});


// Substituir o uso de Session por TherapyPackage
router.get('/patients/:patientId/sessions', auth, async (req, res) => {
  try {
    const packages = await Package.find({ patientId: req.params.patientId });

    const allSessions = packages.flatMap(pkg =>
      pkg.sessions.map(session => ({
        ...session.toObject(),
        packageId: pkg._id
      }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordena por data desc

    res.json(allSessions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar sessões do paciente' });
  }
});



export default router;
