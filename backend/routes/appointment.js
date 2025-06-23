import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import validateId from '../middleware/validateId.js';

import { auth } from '../middleware/auth.js';
import { checkAppointmentConflicts, getAvailableTimeSlots } from '../middleware/conflictDetection.js';
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';

dotenv.config();
const router = express.Router();

// Verifica horários disponíveis
router.get('/available-slots', auth, getAvailableTimeSlots);

// Cria um novo agendamento
router.post('/', auth, checkAppointmentConflicts, async (req, res) => {

    try {
        const appointment = new Appointment(req.body);
        await appointment.save();

        const patient = await Patient.findById(req.body.patientId);
        if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });

        patient.appointments = patient.appointments || [];
        patient.appointments.push(appointment._id);
        await patient.save();

        res.status(201).json(appointment);
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
});

// Atualiza um agendamento com verificação de conflitos
router.put('/:id', validateId, auth, checkAppointmentConflicts, async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Busca agendamentos com filtros
router.get('/', auth, async (req, res) => {
    try {
        const { patientId, doctorId, status } = req.query;
        const filter = {};

        if (patientId && patientId !== 'all') filter.patientId = new mongoose.Types.ObjectId(patientId);
        if (doctorId && doctorId !== 'all') filter.doctorId = new mongoose.Types.ObjectId(doctorId);
        if (status && status !== 'all') filter.status = status;


        const appointments = await Appointment.find(filter)
            .populate('doctorId', 'fullName')
            .populate('patientId', 'fullName');

        if (!appointments || !Array.isArray(appointments)) {
            return res.status(500).json({ error: 'Formato inválido de agendamentos' });
        }

        const calendarEvents = appointments.map(appointment => {
            if (!appointment.date || !appointment.doctorId || !appointment.patientId) {
                console.error('Dados incompletos no agendamento:', appointment._id);
                return null;
            }

            const startDate = new Date(appointment.date);
            if (isNaN(startDate.getTime())) {
                console.error('Data inválida:', appointment.date);
                return null;
            }

            return {
                id: appointment._id,
                title: `${appointment.reason} - Dr. ${appointment.doctorId?.fullName || 'N/A'}`,
                start: startDate.toISOString(),
                end: new Date(startDate.setHours(startDate.getHours() + 1)).toISOString(),
                status: appointment.status,
                description: appointment.reason,
                patient: appointment.patientId ? {
                    id: appointment.patientId._id,
                    name: appointment.patientId.fullName || 'N/A',
                } : { id: null, name: 'N/A' },
                doctor: appointment.doctorId ? {
                    id: appointment.doctorId._id,
                    name: appointment.doctorId.fullName || 'N/A',
                } : { id: null, name: 'N/A' },
            }
        }).filter(event => event !== null);

        res.json(calendarEvents);
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
});

// Deleta um agendamento
router.delete('/:id', validateId, auth, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Agendamento deletado com sucesso' });
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
});

// Histórico de agendamentos por paciente
router.get('/history/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const history = await Appointment.find({ patientId }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
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
});


// Cancela um agendamento
router.patch('/:id/cancel', validateId, auth, async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ error: 'O motivo do cancelamento é obrigatório' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        // Verifica se já está cancelado
        if (appointment.status === 'cancelado') {
            return res.status(400).json({ error: 'Este agendamento já está cancelado' });
        }

        // Atualiza o status e registra o motivo
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                status: 'cancelado',
                canceledReason: reason,
                $push: {
                    history: {
                        action: 'cancelamento',
                        date: new Date(),
                        by: req.user._id,
                        details: { reason }
                    }
                }
            },
            { new: true }
        );

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Adicione esta rota junto com as outras rotas de appointments
router.patch('/:id/complete', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        // Verifica se já está confirmado
        if (appointment.status === 'concluído') {
            return res.status(400).json({ error: 'Este agendamento já está concluído' });
        }

        // Atualiza o status e registra no histórico
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            {
                status: 'concluído',
                $push: {
                    history: {
                        action: 'concluído',
                        date: new Date(),
                        by: req.user._id,
                    }
                }
            },
            { new: true }
        );

        res.json(updatedAppointment);

    } catch (error) {
        console.error('Erro ao concluir agendamento:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Busca todos os agendamentos de um paciente
router.get('/patient/:id', validateId, auth, async (req, res) => {
    const patientId = req.params.id;
    try {
        const appointments = await Appointment.find({ patientId })
            .populate('doctorId')
            .populate('patientId');
        res.json(appointments);
    } catch (err) {
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
});

export default router;
