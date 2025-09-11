import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true },
  hostel: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.checkPassword = function (pw) {
  return bcrypt.compare(pw, this.passwordHash);
};

export default mongoose.model('User', userSchema);
