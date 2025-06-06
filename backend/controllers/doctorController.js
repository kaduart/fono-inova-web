// controllers/doctorController.js
import mongoose from 'mongoose';
import Doctor from '../models/Doctor.js';

export const doctorOperations = {
  create: async (req, res) => {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
    try {
      const {
        fullName,
        email,
        password,
        specialty,
        licenseNumber,
        phoneNumber,
        active
      } = req.body;

      if (
        !fullName ||
        !email ||
        !password ||
        !specialty ||
        !licenseNumber ||
        !phoneNumber ||
        !active
      ) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
      }

      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        throw new Error('Já existe um médico com este e-mail.');
      }

      const existingLicense = await Doctor.findOne({ licenseNumber });
      if (existingLicense) {
        throw new Error('Já existe um médico com este número de registro.');
      }

      const newDoctor = new Doctor({
        fullName,
        email,
        password,
        specialty,
        licenseNumber,
        phoneNumber,
        active
      });

      const savedDoctor = await newDoctor.save({ session: mongoSession });

      await mongoSession.commitTransaction();
      res.status(201).json({
        message: 'Médico criado com sucesso',
        doctor: {
          _id: savedDoctor._id,
          fullName: savedDoctor.fullName,
          email: savedDoctor.email,
          specialty: savedDoctor.specialty,
          licenseNumber: savedDoctor.licenseNumber,
          phoneNumber: savedDoctor.phoneNumber,
          active: savedDoctor.active,
          role: savedDoctor.role
        }
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // 💡 Extrai erros campo a campo
        const errors = Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {});

        return res.status(400).json({
          message: 'Falha na validação dos dados',
          errors
        });
      }

      return res.status(500).json({ error: 'Erro interno' });
    } finally {
      mongoSession.endSession();
    }
  },

  get: {
    all: async (req, res) => {
      try {
        const doctors = await Doctor.find().select('-password').lean();
        res.status(200).json(doctors);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao listar médicos.' });
      }
    },
  },

  update: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.json(doctor);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // 💡 Extrai erros campo a campo
        const errors = Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {});

        return res.status(400).json({
          message: 'Falha na validação dos dados',
          errors
        });
      }

      return res.status(500).json({ error: 'Erro interno' });
    }
  },

  delete: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // 💡 Extrai erros campo a campo
        const errors = Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {});

        return res.status(400).json({
          message: 'Falha na validação dos dados',
          errors
        });
      }

      return res.status(500).json({ error: 'Erro interno' });
    }
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 💡 Extrai erros campo a campo
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        message: 'Falha na validação dos dados',
        errors
      });
    }

    return res.status(500).json({ error: 'Erro interno' });
  }
};
