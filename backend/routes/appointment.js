import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Appointment from '../models/Appointment.js';

dotenv.config();
const router = express.Router();

// Middleware de autenticação
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Criar agendamento
router.post('/', auth, async (req, res) => {
    try {
        // Criar o novo agendamento com base nos dados recebidos
        const appointment = new Appointment(req.body);

        // Salvar o agendamento
        await appointment.save();

        // Adicionar o agendamento ao paciente
        const patient = await Patient.findById(req.body.patient);  // Assumindo que 'patient' é o ID do paciente

        if (!patient) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        // Se o paciente já tem um campo 'appointments', o novo agendamento será adicionado a ele
        patient.appointments = patient.appointments || [];  // Garante que o campo appointments exista
        patient.appointments.push(appointment._id);  // Adiciona o ID do agendamento no array de appointments

        // Salva o paciente com o novo agendamento
        await patient.save();

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { patientId } = req.query;  // Recebe o patientId da query
        if (!patientId) {
            return res.status(400).json({ error: 'Paciente não especificado' });
        }

        const appointments = await Appointment.find({
            patientId: new mongoose.Types.ObjectId(patientId)
        }).populate('doctorId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar agendamento
router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar agendamento
router.delete('/:id', auth, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;