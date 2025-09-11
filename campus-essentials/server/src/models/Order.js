import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // in INR
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: { type: String, enum: ['created','paid','failed'], default: 'created' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Order', orderSchema);
