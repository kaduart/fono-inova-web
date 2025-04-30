import express from 'express';
import { auth } from '../middleware/auth.js';
import Evolution from '../models/Evolution.js';
import Metric from '../models/Metric.js';

const router = express.Router();

// Obter todas as métricas disponíveis
router.get('/metrics', auth, async (req, res) => {
    try {
        const metrics = await Metric.find();
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar nova evolução
router.post('/', auth, async (req, res) => {
    try {
        const evolution = new Evolution(req.body);
        await evolution.save();
        res.status(201).json(evolution);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obter evoluções de um paciente
router.get('/patient/:patientId', auth, async (req, res) => {
    try {
        const evolutions = await Evolution.find({ patientId: req.params.patientId })
            .sort({ date: 1 })
            .populate('doctorId', 'fullName specialty');

        res.json(evolutions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter uma evolução específica
router.get('/:id', auth, async (req, res) => {
    try {
        const evolution = await Evolution.findById(req.params.id)
            .populate('patientId', 'fullName')
            .populate('doctorId', 'fullName specialty');

        if (!evolution) {
            return res.status(404).json({ error: 'Evolução não encontrada' });
        }

        res.json(evolution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar evolução
router.put('/:id', auth, async (req, res) => {
    try {
        const evolution = await Evolution.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!evolution) {
            return res.status(404).json({ error: 'Evolução não encontrada' });
        }

        res.json(evolution);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir evolução
router.delete('/:id', auth, async (req, res) => {
    try {
        const evolution = await Evolution.findByIdAndDelete(req.params.id);

        if (!evolution) {
            return res.status(404).json({ error: 'Evolução não encontrada' });
        }

        res.json({ message: 'Evolução excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;