db.payments.deleteMany({
    patient: ObjectId("6855c921c033e150e1dc6066")
});

db.appointments.deleteMany({
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