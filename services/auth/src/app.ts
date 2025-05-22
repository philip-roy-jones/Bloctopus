import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { WEB_URL } from './config/config';
import { internalOnly } from './middleware/internalOnly';

const app = express();
const appUrl = WEB_URL || "http://localhost:5173";

app.use(cors({ origin: appUrl, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', internalOnly, authRoutes);

export default app;
