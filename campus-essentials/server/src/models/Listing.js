import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  description: String,
  price: { type: Number, required: true, index: true },
  category: { type: String, enum: ['Books','Electronics','Hostel','Other'], index: true },
  images: [String], // Cloudinary URLs
  condition: { type: String, enum: ['New','Like New','Good','Fair'] },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  campus: { type: String, default: 'IIT Kanpur', index: true },
  isSold: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

listingSchema.index({ title: 'text', description: 'text' });
export default mongoose.model('Listing', listingSchema);
