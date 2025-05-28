import express from 'express';
import { generateReport, getPackageById, packageOperations, updateStatus } from '../controllers/therapyPackageController.js';
import { adminOrSecretary, auth } from '../middleware/auth.js';
import validateId from '../middleware/validateId.js';

const router = express.Router();

// Rotas Principais
router.post('/', packageOperations.create);
router.get('/', auth, adminOrSecretary, packageOperations.get.all);
router.get('/search', auth, packageOperations.get.search);
router.get('/:id', auth, getPackageById);
router.patch('/:id', auth, packageOperations.update.package);
router.delete('/:id', auth, packageOperations.delete.package);

// Rotas de Sessões
router.patch('/:id/use-session', auth, packageOperations.useSession);
router.patch('/:id/remove-session', auth, packageOperations.delete.session);
// update session
router.put('/:id/sessions/:sessionId',
    auth, validateId, packageOperations.update.session);

// Rotas de Pagamento
router.post('/:id/payments', auth, packageOperations.registerPayment);
router.patch('/:id/status', auth, updateStatus);

// Relatórios
router.get('/report/generate', auth, adminOrSecretary, generateReport);

export default router;