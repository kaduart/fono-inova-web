import express from 'express';
import { doctorOperations, getDoctorById } from '../controllers/doctorController.js';
import { adminOrSecretary, auth } from '../middleware/auth.js';
import validateId from '../middleware/validateId.js';

const router = express.Router();

// Rotas principais
router.post('/', auth, adminOrSecretary, doctorOperations.create);
router.get('/', auth, adminOrSecretary, doctorOperations.get.all);
router.get('/:id', auth, validateId, getDoctorById);
router.patch('/:id', auth, adminOrSecretary, validateId, doctorOperations.update);
router.delete('/:id', auth, adminOrSecretary, validateId, doctorOperations.delete);

export default router;
