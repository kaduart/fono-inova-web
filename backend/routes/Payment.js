import express from 'express';
import PDFDocument from 'pdfkit';
import { auth, authorize } from '../middleware/auth.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { patientId, doctorId, serviceType, amount, paymentMethod, status, notes, packageId, sessionId } = req.body;

    try {
        // Validação básica
        if (!patientId || !doctorId || !serviceType || !amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios faltando'
            });
        }

        // Cria sessão individual se necessário
        let individualSessionId = null;
        if (serviceType === 'individual_session') {
            const newSession = await Session.create({
                serviceType,
                patient: patientId,
                doctor: doctorId,
                notes,
                package: null
            });
            individualSessionId = newSession._id;
        }

        // Validação específica por tipo de serviço
        if (serviceType === 'package' && !packageId) {
            return res.status(400).json({
                success: false,
                message: 'ID do pacote é obrigatório para pagamentos de pacote'
            });
        }

        // Validação para sessões (exceto individual_session)
        if (serviceType === 'session' && !sessionId) {
            return res.status(400).json({
                success: false,
                message: 'ID da sessão é obrigatório para serviço do tipo "session"'
            });
        }

        // Validação de documentos relacionados
        if (serviceType === 'package') {
            const packageExists = await Package.exists({ _id: packageId });
            if (!packageExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Pacote não encontrado'
                });
            }
        }

        // Validação de sessão para tipo 'session' (individual_session não precisa)
        if (serviceType === 'session') {
            const sessionExists = await Session.exists({ _id: sessionId });
            if (!sessionExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Sessão não encontrada'
                });
            }
        }

        // Criação do pagamento
        const paymentData = {
            patient: patientId,
            doctor: doctorId,
            serviceType,
            amount,
            paymentMethod,
            notes,
            status: status
        };

        // Adiciona campos condicionais
        if (serviceType === 'session') {
            paymentData.session = sessionId;
        } else if (serviceType === 'individual_session') {
            paymentData.session = individualSessionId;
        } else if (serviceType === 'package') {
            paymentData.package = packageId;
        }

        const payment = await Payment.create(paymentData);

        // Atualiza status da sessão para tipos relevantes
        if (serviceType === 'session' || serviceType === 'individual_session') {
            const sessionToUpdate = serviceType === 'individual_session' ? individualSessionId : sessionId;
            await Session.findByIdAndUpdate(
                sessionToUpdate,
                { status: status }
            );
        }

        return res.status(201).json({
            success: true,
            data: payment
        });

    } catch (error) {
        console.error('Erro ao registrar pagamento:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao registrar pagamento',
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
  try {
    const { doctorId, patientId, status, startDate, endDate } = req.query;
    const filters = {};

    if (doctorId) filters.doctor = doctorId;
    if (patientId) filters.patient = patientId;
    if (status) filters.status = status;
    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const payments = await Payment.find(filters)
      .populate({
        path: 'patient',
        select: 'fullName email phoneNumber',
        model: 'Patient',
      })
      .populate({
        path: 'doctor',
        select: 'fullName specialty',
        model: 'Doctor',
      })
      .populate({
        path: 'package',
        select: 'name totalSessions',
        model: 'Package',
      })
      .populate({
        path: 'session',
        select: 'date status',
        model: 'Session',
      })
      .sort({ createdAt: -1 })
      .lean();

    const validPayments = payments.filter(
      (p) => p.session?.status !== 'canceled'
    );

    if (validPayments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum pagamento encontrado',
      });
    }

    const totalReceived = validPayments.reduce((acc, p) => {
      return p.status === 'paid' ? acc + p.amount : acc;
    }, 0);

    const totalPending = validPayments.reduce((acc, p) => {
      return p.status === 'pending' ? acc + p.amount : acc;
    }, 0);

    const formattedPayments = validPayments.map((payment) => ({
      ...payment,
      patientName: payment.patient?.fullName || 'Não informado',
      doctorName: payment.doctor?.fullName || 'Não informado',
      doctorSpecialty: payment.doctor?.specialty || 'Não informada',
      packageName: payment.package?.name || null,
      formattedDate: new Date(payment.createdAt).toLocaleDateString('pt-BR'),
      formattedAmount: `R$ ${payment.amount.toFixed(2)}`,
    }));

    return res.status(200).json({
      success: true,
      count: formattedPayments.length,
      data: formattedPayments,
      totals: {
        received: totalReceived,
        pending: totalPending,
      },
    });
  } catch (err) {
    console.error('Erro ao buscar pagamentos:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pagamentos',
      error:
        process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});


// Atualizar o status de pagamento e sincronizar o status do pacot
router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // 1. Validações iniciais
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Pagamento não encontrado'
            });
        }

        // 2. Validação do status
        const validStatuses = ['pending', 'paid', 'canceled'];
        if (updateData.status && !validStatuses.includes(updateData.status)) {
            return res.status(400).json({
                success: false,
                message: 'Status inválido. Valores permitidos: pending, paid, canceled'
            });
        }

        // 3. Validação da data
        if (updateData.date) {
            const date = new Date(updateData.date);
            if (isNaN(date.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: 'Formato de data inválido. Use ISO 8601 (YYYY-MM-DD)'
                });
            }
            updateData.date = date.toISOString();
        }

        // 4. Atualização do pagamento
        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        );

        // 5. Atualizações relacionadas
        if (updatedPayment) {
            // Atualizar sessão se o valor ou status mudou
            if (updatedPayment.sessionId &&
                (updateData.amount !== undefined || updateData.status)) {
                await updateSessionStatus(
                    updatedPayment.sessionId,
                    updatedPayment.amount,
                    updatedPayment.status
                );
            }

            // Atualizar pacote se necessário
            if (updatedPayment.packageId) {
                await updatePackageStatus(updatedPayment.packageId);
            }
        }

        // 6. Resposta de sucesso
        res.status(200).json({
            success: true,
            data: updatedPayment,
            message: 'Pagamento atualizado com sucesso'
        });

    } catch (err) {
        console.error('Erro ao atualizar pagamento:', err);

        // Tratamento de erros do Mongoose
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Erro de validação',
                errors: err.errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno ao atualizar pagamento'
        });
    }
});

// Funções auxiliares
async function updateSessionStatus(sessionId, amountPaid) {
    const session = await Session.findById(sessionId);
    if (!session) return;

    if (amountPaid >= session.price) {
        session.status = 'paid';
    } else if (amountPaid > 0) {
        session.status = 'partial';
    } else {
        session.status = 'pending';
    }
    await session.save();
}

async function updatePackageStatus(packageId) {
    const packageData = await Package.findById(packageId);
    if (!packageData) return;

    const unpaidSessions = await Session.countDocuments({
        packageId,
        status: { $nin: ['paid', 'completed'] }
    });

    packageData.status = unpaidSessions === 0 ? 'completed' : 'active';
    await packageData.save();
}

// Exportação de PDF
router.get('/export/pdf', authorize(['admin']), async (req, res) => {
    try {
        const filters = req.query;
        const payments = await Payment.find(filters)
            .populate('patientId doctorId sessionId packageId')
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
            doc.text(p.doctorId.name, 250, doc.y, { width: 120, continued: true });
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
        .populate('patientId doctorId')
        .sort({ sessionDate: 1 });

    const headers = ['Data', 'Paciente', 'Profissional', 'Valor', 'Status', 'Método'];
    const rows = payments.map(p => [
        p.sessionDate.toISOString().split('T')[0],
        p.patientId.name,
        p.doctorId.name,
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

// routes/paymentRoutes.js

router.get('/totals', async (req, res) => {
    try {
        const { doctorId, startDate, endDate } = req.query;

        const matchStage = {};
        if (doctorId) matchStage.doctor = mongoose.Types.ObjectId(doctorId);
        if (startDate && endDate) {
            matchStage.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const aggregation = [
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalReceived: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0]
                        }
                    },
                    totalPending: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0]
                        }
                    },
                    countReceived: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, 1, 0]
                        }
                    },
                    countPending: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                        }
                    }
                }
            }
        ];

        const result = await Payment.aggregate(aggregation);

        const totals = result[0] || {
            totalReceived: 0,
            totalPending: 0,
            countReceived: 0,
            countPending: 0
        };

        res.status(200).json({
            success: true,
            data: {
                totalReceived: totals.totalReceived,
                totalPending: totals.totalPending,
                countReceived: totals.countReceived,
                countPending: totals.countPending
            }
        });

    } catch (err) {
        console.error('Erro ao calcular totais:', err);
        res.status(500).json({
            success: false,
            message: 'Erro ao calcular totais'
        });
    }
});


router.get('/session-individual', async (req, res) => {
    try {
        // Construir filtro básico
        const filter = {
            type: 'individual_session',
            package: null // Garante que não está atrelada a pacotes
        };

        // Filtros opcionais
        if (req.query.patientId) filter.patient = req.query.patientId;
        if (req.query.doctorId) filter.doctor = req.query.doctorId;
        if (req.query.status) filter.status = req.query.status;

        // Filtro por data
        if (req.query.dateFrom || req.query.dateTo) {
            filter.date = {};
            if (req.query.dateFrom) filter.date.$gte = new Date(req.query.dateFrom);
            if (req.query.dateTo) filter.date.$lte = new Date(req.query.dateTo);
        }

        // Buscar sessões com populamento de dados relacionados
        const sessions = await Session.find(filter)
            .populate('patient', 'name email phone') // Campos do paciente
            .populate('doctor', 'name specialty')    // Campos do médico
            .sort({ date: -1 }); // Ordenar por data mais recente

        return res.json({
            success: true,
            count: sessions.length,
            data: sessions
        });

    } catch (error) {
        console.error('Erro ao buscar sessões avulsas:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

export default router;

