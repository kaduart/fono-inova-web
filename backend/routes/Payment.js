import express from 'express';
import PDFDocument from 'pdfkit';
import { adminOrSecretary, auth, authorize } from '../middleware/auth.js';
import Package from '../models/Package.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { patientId, professionalId, sessionDate, sessionType, value, paymentMethod, packageId, sessionId } = req.body;

    try {
        const packageData = await Package.findById(packageId);
        const sessionData = await Session.findById(sessionId);

        if (!packageData || !sessionData) {
            return res.status(400).json({ message: 'Pacote ou Sessão não encontrados' });
        }

        // Verifica se o valor do pagamento cobre o total
        const totalAmount = sessionData.price; // Exemplo de preço da sessão
        const partialPayment = value < totalAmount;

        const payment = await Payment.create({
            patientId,
            professionalId,
            sessionDate,
            sessionType,
            value,
            paymentMethod,
            packageId,
            sessionId,
            totalAmount,
            partialPayment
        });

        // Atualiza o status da sessão dependendo do valor pago
        sessionData.status = partialPayment ? 'partial' : 'paid'; // Marca como "pago" ou "parcial"
        await sessionData.save();

        // Atualiza o pacote caso todas as sessões tenham sido pagas
        const remainingSessions = await Session.find({ packageId, status: { $ne: 'paid' } });
        if (remainingSessions.length === 0) {
            packageData.status = 'completed'; // Pacote concluído
            await packageData.save();
        }

        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar o pagamento' });
    }
});


router.get('/', adminOrSecretary, async (req, res) => {
    const { professional, patient, status, startDate, endDate } = req.query;

    let filters = {};
    if (professional) filters.professional = professional;
    if (patient) filters.patientName = patient;
    if (status) filters.status = status;
    if (startDate && endDate) {
        filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const payments = await Payment.find(filters);
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar pagamentos' });
    }
});

// Atualizar o status de pagamento e sincronizar o status do pacote
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status, value } = req.body;
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado' });

        // Atualiza o status e o valor do pagamento
        payment.status = status || payment.status;
        if (value) payment.value = value;
        await payment.save();

        // Atualiza a sessão correspondente
        const sessionData = await Session.findById(payment.sessionId);
        if (!sessionData) return res.status(404).json({ message: 'Sessão não encontrada' });

        // Atualiza o status da sessão conforme o valor pago
        const totalAmount = sessionData.price;
        if (value >= totalAmount) {
            sessionData.status = 'paid';
        } else if (value > 0) {
            sessionData.status = 'partial';
        } else {
            sessionData.status = 'pending';
        }
        await sessionData.save();

        // Atualiza o pacote se todas as sessões estiverem pagas
        const packageData = await Package.findById(payment.packageId);
        if (packageData) {
            const remainingSessions = await Session.find({
                packageId: payment.packageId,
                status: { $ne: 'paid' }
            });

            // Se todas as sessões estiverem pagas, atualiza o pacote
            packageData.status = remainingSessions.length === 0 ? 'completed' : 'active';
            await packageData.save();
        }

        res.status(200).json({ message: 'Pagamento atualizado com sucesso', payment });
    } catch (err) {
        console.error('Erro ao atualizar pagamento', err);
        res.status(500).json({ message: 'Erro ao atualizar pagamento' });
    }
});

// Exportação de PDF
router.get('/export/pdf', authorize(['admin']), async (req, res) => {
    try {
        const filters = req.query;
        const payments = await Payment.find(filters)
            .populate('patientId professionalId sessionId packageId')
            .sort({ sessionDate: 1 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_pagamentos.pdf');

        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        doc.pipe(res);

        doc.fontSize(18).text('Relatório de Pagamentos', { align: 'center' });
        doc.moveDown(1);

        doc.fontSize(12);
        doc.text('Data', 50, doc.y, { width: 80, continued: true });
        doc.text('Paciente', 130, doc.y, { width: 120, continued: true });
        doc.text('Profissional', 250, doc.y, { width: 120, continued: true });
        doc.text('Valor', 370, doc.y, { width: 60, continued: true });
        doc.text('Status', 430, doc.y, { width: 80 });
        doc.text('Pacote', 510, doc.y, { width: 80 });
        doc.moveDown(0.5);

        payments.forEach(p => {
            const date = p.sessionDate.toISOString().split('T')[0];
            doc.text(date, 50, doc.y, { width: 80, continued: true });
            doc.text(p.patientId.name, 130, doc.y, { width: 120, continued: true });
            doc.text(p.professionalId.name, 250, doc.y, { width: 120, continued: true });
            doc.text(`R$ ${p.value.toFixed(2)}`, 370, doc.y, { width: 60, continued: true });
            doc.text(p.status.toUpperCase(), 430, doc.y, { width: 80 });
            doc.text(p.packageId.name, 510, doc.y, { width: 80 });
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        console.error('Erro ao gerar PDF', err);
        res.status(500).json({ message: 'Erro ao gerar PDF' });
    }
});

// Exportação CSV
router.get('/export/csv', authorize(['admin', 'secretary']), async (req, res) => {
    const filters = req.query;
    const payments = await Payment.find(filters)
        .populate('patientId professionalId')
        .sort({ sessionDate: 1 });

    const headers = ['Data', 'Paciente', 'Profissional', 'Valor', 'Status', 'Método'];
    const rows = payments.map(p => [
        p.sessionDate.toISOString().split('T')[0],
        p.patientId.name,
        p.professionalId.name,
        p.value.toFixed(2),
        p.status,
        p.paymentMethod
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

    res
        .header('Content-Type', 'text/csv')
        .attachment('pagamentos.csv')
        .send(csv);
});

export default router;

