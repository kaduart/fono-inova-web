import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import MedicalEvent from '../models/MedicalEvent.js';

const DEFAULT_SPECIALTY_VALUES = {
    fonoaudiologia: 200,
    psicologia: 200,
    'terapeuta ocupacional': 200,
    fisioterapia: 200,
    pediatria: 220,
    neuroped: 250,
    avaliacao: 250,
    unknown: 200
};
// Mapeamento unificado de status
const STATUS_MAP = {
    'agendado': 'scheduled',
    'confirmado': 'confirmed',
    'concluído': 'concluded',
    'cancelado': 'canceled',
    'faltou': 'no_show',
    'pendente': 'pending',
    'em_andamento': 'in_progress',
    'pago': 'paid',
    'completed': 'completed',
    'package_paid': 'package_paid' // Novo status
};

// Funções auxiliares
const safeObjectId = (id) => {
    if (!id) return null;
    if (typeof id === 'string') return id;
    if (id instanceof mongoose.Types.ObjectId) return id;
    if (id._id) return id._id;
    return null;
};

const getSpecialty = async (doc, type) => {
    console.log('getSpecialty - doc:', doc, 'type:', type);

    // 1. Se já tiver specialty definida e válida
    if (doc.specialty && doc.specialty !== 'unknown') {
        return doc.specialty;
    }

    // 2. Para pagamentos, buscar specialty do appointment
    if (type === 'payment' && doc.appointment) {
        try {
            // Buscar o appointment completo
            const appointment = await Appointment.findById(doc.appointment).lean();

            if (appointment && appointment.specialty) {
                return appointment.specialty;
            }

            // Se não encontrar, tentar obter do paciente
            if (appointment?.patient) {
                const patient = await Patient.findById(appointment.patient).lean();
                return patient?.specialty || 'fonoaudiologia';
            }
        } catch (error) {
            console.error('Erro ao buscar specialty:', error);
        }
        return 'fonoaudiologia'; // Valor padrão seguro
    }

    // 3. Tentar outras propriedades com fallback seguro
    return doc.sessionType || doc.package?.sessionType || 'fonoaudiologia';
};
const calculateValue = (doc, specialty) => {
    // Prioridade: valor específico > valor do pacote > valor padrão
    if (typeof doc.sessionValue === 'number') return doc.sessionValue;
    if (typeof doc.value === 'number') return doc.value;
    if (doc.package?.sessionValue) return doc.package.sessionValue;
    return DEFAULT_SPECIALTY_VALUES[specialty] || DEFAULT_SPECIALTY_VALUES.unknown;
};

const getOperationalStatus = (status) => {
    if (status === 'completed') return 'confirmado';
    if (status === 'canceled') return 'cancelado';
    return 'agendado';
};

const getClinicalStatus = (status) => {
    if (status === 'completed') return 'concluído';
    if (status === 'canceled') {
        return confirmedAbsence ? 'faltou' : 'cancelado';
    }
    return 'pendente';
};


// Função principal de sincronização
export const syncEvent = async (originalDoc, type, session = null) => {
    try {
        if (type === 'package' && !originalDoc.__synced) {
            // Marcar documento como sincronizado
            originalDoc.__synced = true;
            await originalDoc.save();
        }
        // Obter specialty considerando o tipo de documento (AGORA ASSÍNCRONO)
        const specialty = await getSpecialty(originalDoc, type);

        const value = calculateValue(originalDoc, specialty);

        // Dados para atualização
        const updateData = {
            date: originalDoc.date,
            time: originalDoc.time,
            doctor: safeObjectId(originalDoc.doctor),
            patient: safeObjectId(originalDoc.patient),
            specialty, // Usa o valor obtido
            value,
            operationalStatus: getOperationalStatus(originalDoc.operationalStatus),
            clinicalStatus: getClinicalStatus(originalDoc.clinicalStatus),
            type,
            package: originalDoc.package ? safeObjectId(originalDoc.package) : null,
            relatedAppointment: type === 'session' && originalDoc.appointmentId ?
                safeObjectId(originalDoc.appointmentId) : null
        };
        console.log(`[SYNC] Sincronizando evento: `, updateData);
        await MedicalEvent.findOneAndUpdate(
            { originalId: originalDoc._id, type },
            updateData,
            {
                upsert: true,
                session,
                new: true,
                runValidators: true
            }
        );

        console.log(`[SYNC] Evento sincronizado: ${originalDoc._id} (${type}) - Specialty: ${specialty}`);

    } catch (error) {
        console.error('Erro na sincronização:', {
            error: error.message,
            docId: originalDoc._id,
            type,
            specialty: originalDoc.specialty || 'não definida'
        });
        throw error;
    }
};