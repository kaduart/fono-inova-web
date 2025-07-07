import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';

export async function updatePatientAppointments(patientId) {
  try {
    const now = new Date();
    
    // Busca agendamentos ordenados por data
    const appointments = await Appointment.find({ patient: patientId })
      .sort({ date: 1 })
      .select('date status doctor reason');
    
    // Filtra agendamentos passados e futuros
    const pastAppointments = appointments.filter(a => a.date < now);
    const futureAppointments = appointments.filter(a => a.date >= now);
    
    // Determina último e próximo agendamento
    const lastAppointment = pastAppointments.length > 0 
      ? pastAppointments[pastAppointments.length - 1]._id 
      : null;
      
    const nextAppointment = futureAppointments.length > 0 
      ? futureAppointments[0]._id 
      : null;
    
    // Atualiza o paciente
    await Patient.findByIdAndUpdate(patientId, {
      lastAppointment,
      nextAppointment
    });
    
  } catch (error) {
    console.error(`Erro ao atualizar agendamentos do paciente ${patientId}:`, error);
  }
}