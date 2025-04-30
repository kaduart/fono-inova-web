import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { auth } from '../middleware/auth.js';
import { checkAppointmentConflicts, getAvailableTimeSlots } from '../middleware/conflictDetection.js';
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';

dotenv.config();
const router = express.Router();

router.get('/available-slots', auth, getAvailableTimeSlots);

router.post('/', auth, checkAppointmentConflicts, async (req, res) => {
    console.log('aquiooo', req.body)

    try {
        const appointment = new Appointment(req.body);
        await appointment.save();

        const patient = await Patient.findById(req.body.patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        patient.appointments = patient.appointments || [];
        patient.appointments.push(appointment._id);
        await patient.save();

        res.status(201).json(appointment);
    } catch (error) {
        console.log('bateu no erroooo', error)

        res.status(400).json({ error: error.message, stack: error.stack });
    }
});


// Atualizar agendamento com verificação de conflitos
router.put('/:id', auth, checkAppointmentConflicts, async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



router.get('/', auth, async (req, res) => {
    console.log('reeeeq', req);  // Verifique os dados aqui

    try {
        const { patientId, doctorId, status } = req.query;

        const filter = {};
        if (patientId && patientId !== 'all') {
            filter.patientId = new mongoose.Types.ObjectId(patientId);
        }
        if (doctorId && doctorId !== 'all') {
            filter.doctorId = new mongoose.Types.ObjectId(doctorId);
        }
        if (status && status !== 'all') {
            filter.status = status;
        }

        const appointments = await Appointment.find(filter)
            .populate('doctorId')  // Populate doctor
            .populate('patientId');  // Populate patient

        console.log('appointments', appointments);  // Verifique os dados aqui

        const calendarEvents = appointments.map(appointment => ({
            id: appointment._id,
            title: `${appointment.reason} - Dr. ${appointment.doctorId?.fullName || 'N/A'}`,
            start: new Date(appointment.date).toISOString(),
            end: new Date(new Date(appointment.date).setHours(new Date(appointment.date).getHours() + 1)).toISOString(),
            status: appointment.status,
            description: appointment.reason,
            patient: appointment.patientId ? {
                id: appointment.patientId._id,
                name: appointment.patientId.fullName || 'N/A',
            } : {
                id: null,
                name: 'N/A',
            },
            doctor: appointment.doctorId ? {
                id: appointment.doctorId._id,
                name: appointment.doctorId.fullName || 'N/A',
            } : {
                id: null,
                name: 'N/A',
            },
        }));

        res.json(calendarEvents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





// Atualizar agendamento
router.put('/:id', auth, async (req, res) => {
    console.log('aquiooo', req.body)

    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar agendamento
router.delete('/:id', auth, async (req, res) => {
    console.log('aquiooo', req.body)

    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;