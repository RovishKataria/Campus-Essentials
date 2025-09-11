import mongoose from 'mongoose';
const convSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  updatedAt: { type: Date, default: Date.now }
});
export default mongoose.model('Conversation', convSchema);
