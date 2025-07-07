import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import Session from '../models/Session.js';

// Configurar caminhos absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config();

async function deleteAllPatientData() {
    try {
        // Verificar se a URI está definida
        if (!process.env.MONGODB_URI) {
            throw new Error('❌ MONGODB_URI não definida no arquivo .env');
        }

        // Conectar ao MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado ao MongoDB');

        // Substitua pelo ID do paciente desejado
        const PATIENT_ID = 'SEU_PATIENT_ID_AQUI';

        if (!mongoose.Types.ObjectId.isValid(PATIENT_ID)) {
            throw new Error('❌ ID do paciente inválido');
        }

        console.log(`🔍 Buscando dados do paciente ${PATIENT_ID}...`);

        // Excluir todos os agendamentos do paciente
        const appointmentsResult = await Appointment.deleteMany({ patient: PATIENT_ID });
        console.log(`🗑️ ${appointmentsResult.deletedCount} agendamento(s) excluído(s)`);

        // Excluir todas as sessões do paciente
        const sessionsResult = await Session.deleteMany({ patient: PATIENT_ID });
        console.log(`🗑️ ${sessionsResult.deletedCount} sessão(ões) excluída(s)`);

        // Excluir todos os pagamentos do paciente
        const paymentsResult = await Payment.deleteMany({ patient: PATIENT_ID });
        console.log(`🗑️ ${paymentsResult.deletedCount} pagamento(s) excluído(s)`);

        console.log('\n🎉 Todos os dados do paciente foram excluídos com sucesso!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro durante a exclusão:', err.message);
        process.exit(1);
    }
}

// Executar a função
deleteAllPatientData();