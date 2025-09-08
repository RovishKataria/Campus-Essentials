const mongoose = require('mongoose');

async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_essentials';
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
}

module.exports = { connectToDatabase };


