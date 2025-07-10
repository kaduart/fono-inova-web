// Novo script: fix-all-appointments.js
const conn = new Mongo("mongodb+srv://kaduart:%40Soundcar10@cluster0.g2c3sdk.mongodb.net/test");
const db = conn.getDB("test");

// Encontrar todos appointments sem pagamento
const appointments = db.appointments.find({
  payment: { $exists: false }
}).toArray();

print(`🔍 Encontrados ${appointments.length} appointments sem pagamento`);

appointments.forEach(appointment => {
  print(`\nProcessando appointment: ${appointment._id}`);
  
  try {
    // Procurar pagamento existente
    const existingPayment = db.payments.findOne({
      patient: appointment.patient,
      doctor: appointment.doctor,
      createdAt: {
        $gte: new Date(appointment.date.getTime() - 24 * 60 * 60 * 1000),
        $lte: new Date(appointment.date.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingPayment) {
      // Associar pagamento existente
      db.appointments.updateOne(
        { _id: appointment._id },
        { $set: { payment: existingPayment._id } }
      );
      
      db.payments.updateOne(
        { _id: existingPayment._id },
        { $set: { appointment: appointment._id } }
      );
      
      print(`✅ Associado pagamento existente: ${existingPayment._id}`);
    } else {
      // Criar novo pagamento
      const newPayment = {
        patient: appointment.patient,
        doctor: appointment.doctor,
        serviceType: "session",
        amount: 150,
        paymentMethod: "cartão",
        status: "paid",
        notes: `Pagamento criado para appointment ${appointment._id}`,
        appointment: appointment._id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const insertResult = db.payments.insertOne(newPayment);
      const paymentId = insertResult.insertedId;
      
      // Associar novo pagamento
      db.appointments.updateOne(
        { _id: appointment._id },
        { $set: { payment: paymentId } }
      );
      
      print(`💰 Novo pagamento criado: ${paymentId}`);
    }
  } catch (error) {
    print(`❌ Erro no appointment ${appointment._id}: ${error}`);
  }
});

print("\n✅ Processamento concluído!");