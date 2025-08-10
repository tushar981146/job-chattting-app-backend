import express from 'express'
import { connectDB } from './libs/db.js'
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js'
import messages from './routes/messages.route.js'
import { app, server } from './libs/socket.js';

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://job-chatting-app-frontend-wew9.vercel.app',  // Vercel frontend ka URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['set-cookie']
}));
app.use("/api/auth", authRouter);
app.use('/api/messages', messages);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port, http://localhost:${PORT}`);
    connectDB();
})
