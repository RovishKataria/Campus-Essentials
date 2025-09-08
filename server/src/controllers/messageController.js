const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.createOrGetConversation = async (req, res) => {
  const { buyer_id, seller_id, product_id } = req.body;
  let convo = await Conversation.findOne({ buyer: buyer_id, seller: seller_id, product: product_id });
  if (!convo) {
    convo = await Conversation.create({ buyer: buyer_id, seller: seller_id, product: product_id });
  }
  res.json(convo);
};

exports.getUserConversations = async (req, res) => {
  const userId = req.params.userId;
  const conversations = await Conversation.find({ $or: [{ buyer: userId }, { seller: userId }] })
    .populate('product', 'title')
    .populate('buyer seller', 'name');
  const mapped = conversations.map(c => ({
    id: c._id,
    product_title: c.product?.title,
    other_user: String(c.buyer._id) === String(userId) ? c.seller.name : c.buyer.name,
    created_at: c.createdAt,
  }));
  res.json(mapped);
};

exports.getMessagesInConversation = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversation: conversationId }).sort({ sentAt: 1 });
  res.json(messages);
};

exports.sendMessage = async (req, res) => {
  const { conversation_id, sender_id, message } = req.body;
  const msg = await Message.create({ conversation: conversation_id, sender: sender_id, content: message });
  res.status(201).json(msg);
};


