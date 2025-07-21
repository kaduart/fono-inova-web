// scripts/migrateEvents.js
import mongoose from 'mongoose';
import { syncEvent } from '../services/syncService.js';
import Appointment from '../models/Appointment.js';
import Session from '../models/Session.js';
import Package from '../models/Package.js';

const migrate = async () => {
  const appointments = await Appointment.find();
  for (const app of appointments) {
    await syncEvent(app, 'appointment');
  }

  const sessions = await Session.find();
  for (const session of sessions) {
    await syncEvent(session, 'session');
  }

  const packages = await Package.find();
  for (const pkg of packages) {
    await syncEvent(pkg, 'package');
  }

  console.log('Migração concluída!');
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => migrate())
  .finally(() => mongoose.disconnect());