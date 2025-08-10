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
  origin: process.env.client_url,  // Vercel frontend ka URL
  credentials: true,
}));
app.use("/api/auth", authRouter);
app.use('/api/messages', messages);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port, http://localhost:${PORT}`);
    connectDB();
})
