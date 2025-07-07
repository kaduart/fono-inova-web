import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';

dotenv.config();

async function updateOperationalStatusOnly() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    const statusMap = {
      'agendado': 'agendado',
      'confirmado': 'confirmado',
      'cancelado': 'cancelado',
      'concluído': 'pago',
      'faltou': 'cancelado'
    };

    const appointments = await Appointment.find({ status: { $in: Object.keys(statusMap) } });
    console.log(`🔍 Encontrados ${appointments.length} agendamentos com status válidos.`);

    let atualizados = 0;

    for (const [i, appt] of appointments.entries()) {
      const newStatus = statusMap[appt.status];
      if (appt.operationalStatus !== newStatus) {
        appt.operationalStatus = newStatus;
        await appt.save();
        console.log(`✅ ${i + 1}: ${appt._id} - "${appt.status}" → "${newStatus}"`);
        atualizados++;
      }
    }

    console.log(`\n🎉 Atualização concluída. Total atualizados: ${atualizados}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro durante atualização:', err);
    process.exit(1);
  }
}

updateOperationalStatusOnly().catch(console.error);
