const express = require('express');
const router = express.Router();
const {
  createOrGetConversation,
  getUserConversations,
  getMessagesInConversation,
  sendMessage,
} = require('../controllers/messageController');
const { authenticate } = require('../middleware/auth');

router.get('/conversations/:userId', authenticate, getUserConversations);
router.post('/conversation', authenticate, createOrGetConversation);
router.get('/:conversationId', authenticate, getMessagesInConversation);
router.post('/', authenticate, sendMessage);

module.exports = router;


