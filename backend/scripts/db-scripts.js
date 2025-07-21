db.payments.deleteMany({
    patient: ObjectId("6855c921c033e150e1dc6066")
});

db.appointments.deleteMany({
    patient: ObjectId("6855c921c033e150e1dc6066")
});
db.sessions.deleteMany({
    patient: ObjectId("6855c921c033e150e1dc6066")
});


db.appointments.deleteMany({
    patient: ObjectId("685c5617aec14c71635865ec"),
    operationalStatus: "cancelado"
});

db.payments.deleteMany({
    patient: ObjectId("685c5617aec14c71635865ec"),
    status: "canceled"
});

// deltar sessaos doctor
db.sessions.deleteMany({
    doctor: ObjectId("686024fb74dcf94b84ade15a"),
});

//consulta sessao por id
db.sessions.find({
  doctor: ObjectId("686024fb74dcf94b84ade15a"),
  status: "scheduled"
}).sort({ date: 1 }).limit(10).pretty()


//consulta agendamento por id
db.appointments.find({
  doctor: ObjectId("685c2affaec14c71635863b7"),
}).sort({ date: 1 }).limit(10).pretty()


// Verificar sessões atualizadas
const updatedSessions = await Session.find({
  time: { $exists: true },
  updatedAt: { $gte: new Date(Date.now() - 60000) } // Último minuto
});
console.log(`Sessões atualizadas recentemente: ${updatedSessions.length}`);

// Verificar sessões ainda sem time
const stillWithoutTime = await Session.countDocuments({
  time: { $exists: false }
});
console.log(`Sessões ainda sem horário: ${stillWithoutTime}`);