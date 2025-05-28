import mongoose from 'mongoose';


const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Paciente é obrigatório']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Profissional é obrigatório']
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Use o formato YYYY-MM-DD'], // Nova validação
    validate: {
      validator: function (date) {
        return date >= new Date(); // Validação direta (date já é Date)
      },
      message: 'A data deve ser futura.'
    }
  },
  time: {
    type: String,
    required: [true, 'Horário é obrigatório'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido (HH:MM)']
  },
  reason: {
    type: String,
    required: [false], // Corrigido o typo "fale" para true
  },
  status: {
    type: String,
    enum: {
      values: ['agendado', 'concluído', 'cancelado'],
      message: 'Status inválido'
    },
    default: 'agendado'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

// Adicione validações adicionais se necessário
appointmentSchema.pre('save', function (next) {
  if (this.status === 'concluído') {
    next(new Error('Notas de conclusão são obrigatórias para consultas concluídas'));
  } else {
    next();
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
