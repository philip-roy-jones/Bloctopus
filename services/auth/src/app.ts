import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = 1111;
const appUrl = process.env.APP_URL || "http://localhost:5173";

app.use(cors({ origin: appUrl, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoutes);

export default app;
