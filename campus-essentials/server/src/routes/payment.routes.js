import { Router } from 'express';
const r = Router();
// Payments disabled for now
r.get('*', (_req, res) => res.status(404).json({ error: 'Payments disabled' }));
r.post('*', (_req, res) => res.status(404).json({ error: 'Payments disabled' }));
export default r;
