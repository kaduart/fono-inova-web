import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Appointment from '../../models/Appointment.js';

// Configurar caminhos absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function fixMigrationMetadata() {
  try {
    // 1. Conectar ao MongoDB
    console.log('🔗 Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado com sucesso');

    // 2. Encontrar documentos sem metadados
    const filter = {
      clinicalStatus: { $exists: true }, // Documentos migrados
      meta: { $exists: false }           // Mas sem metadados
    };

    const appointments = await Appointment.find(filter);
    console.log(`🔍 ${appointments.length} documentos sem metadados encontrados`);

    // 3. Processar cada documento
    let updatedCount = 0;
    const errors = [];

    for (const app of appointments) {
      try {
        // Calcular se a data é passada
        const now = new Date();
        const isPastDate = app.date < now;

        // Criar objeto de metadados
        const meta = {
          originalStatus: app.status,
          migratedAt: new Date(),
          isPastDate,
          isInvalidDate: app.date < new Date('1900-01-01') // Verificar datas absurdas
        };

        // 4. Atualizar documento
        await Appointment.updateOne(
          { _id: app._id },
          { $set: { meta } }
        );

        updatedCount++;
      } catch (error) {
        errors.push({
          _id: app._id,
          error: error.message
        });
        console.error(`❌ Erro no documento ${app._id}:`, error.message);
      }
    }

    // 5. Relatório final
    console.log(`
🎉 Atualização concluída!
✅ Documentos atualizados: ${updatedCount}
❌ Erros: ${errors.length}
    `);

    if (errors.length > 0) {
      console.log('📝 Detalhes dos erros:');
      console.table(errors);
    }

  } catch (error) {
    console.error('❌ Erro fatal:', error);
  } finally {
    // 6. Desconectar
    await mongoose.disconnect();
    console.log('✅ Conexão encerrada');
    process.exit(0);
  }
}

fixMigrationMetadata();