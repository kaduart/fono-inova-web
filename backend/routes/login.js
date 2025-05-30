import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {

  console.log('Received data:', req.body);
  const { email, password, role } = req.body;


  try {
    let user;
    if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      user = await User.findOne({ email, role });
    }
    console.log('Usuário encontrado:', user);
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or role' });
    }

    if (!user.password) {
      return res.status(400).send({ error: 'Usuário não possui senha registrada' });
    }
    console.log('Senha fornecida:', password);
    console.log('Senha no banco:', user.password);
    console.log('Usuário encontrado:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.send({ token, role: user.role });

  } catch (error) {
    console.error('Erro ao fazer login:', error); // <-- Adiciona este log
    res.status(500).send({ error: 'Server error', message: error.message });
  }
});

export default router;
