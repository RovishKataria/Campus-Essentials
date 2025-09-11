import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './utils/db.js';

import authRoutes from './routes/auth.routes.js';
import listingRoutes from './routes/listing.routes.js';
import messageRoutes from './routes/message.routes.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true }
});
global._io = io; // so controllers can emit

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/messages', messageRoutes);

app.get("/", (req, res) => {
  res.send("Campus Essentials API is running 🚀");
});


io.on('connection', (socket) => {
  // join user room by userId for direct messages
  socket.on('join', (userId) => socket.join(`user:${userId}`));
  socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => console.log(`API running on :${PORT}`));
});
