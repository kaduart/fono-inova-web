import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const user = new User({ fullName, email, password, role });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: 'Email already exists' });
    }
    res.status(400).send({ error: error.message });
  }
});

export default router;
