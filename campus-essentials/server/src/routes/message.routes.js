import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
const r = Router();

r.get('/', requireAuth, async (req, res) => {
  const convs = await Conversation.find({ members: req.user.id }).sort({ updatedAt: -1 }).populate('listing','title images').populate('members','name');
  res.json(convs);
});

r.post('/start', requireAuth, async (req, res) => {
  const { otherUserId, listingId } = req.body;
  let conv = await Conversation.findOne({ members: { $all: [req.user.id, otherUserId] }, listing: listingId });
  if (!conv) conv = await Conversation.create({ members:[req.user.id, otherUserId], listing: listingId });
  res.json(conv);
});

r.get('/:conversationId', requireAuth, async (req, res) => {
  const msgs = await Message.find({ conversation: req.params.conversationId }).sort({ createdAt: 1 });
  res.json(msgs);
});

r.get('/:conversationId/meta', requireAuth, async (req, res) => {
  const conv = await Conversation.findById(req.params.conversationId).populate('members','name email');
  if (!conv) return res.status(404).json({ error: 'Not found' });
  res.json(conv);
});

r.post('/:conversationId', requireAuth, async (req, res) => {
  const { to, text } = req.body;
  const msg = await Message.create({ conversation: req.params.conversationId, from: req.user.id, to, text });
  // Emit to receiver
  global._io.to(`user:${to}`).emit('new-message', { conversationId: req.params.conversationId, msg });
  res.status(201).json(msg);
});

export default r;
