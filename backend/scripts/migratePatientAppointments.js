import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Patient from '../models/Patient.js';
import { updatePatientAppointments } from '../utils/appointmentUpdater.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro de conexão:', err));

const migrate = async () => {
    try {
        const patients = await Patient.find();

        for (const patient of patients) {
            console.log(`Atualizando paciente ${patient.fullName}...`);
            await updatePatientAppointments(patient._id);
        }

        console.log('Migração concluída com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro na migração:', error);
        process.exit(1);
    }
};

migrate();