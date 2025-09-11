import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';
const r = Router();

r.post('/register', async (req, res) => {
  const { name, email, password, hostel, phone } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, hostel, phone });
  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ token, user: { id: user._id, name, email } });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); if (!user) return res.status(400).json({ error: 'Invalid' });
  const ok = await user.checkPassword(password); if (!ok) return res.status(400).json({ error: 'Invalid' });
  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ token, user: { id: user._id, name: user.name, email } });
});

r.post('/logout', (req, res) => {
  res.clearCookie('token').json({ ok: true });
});

export default r;
