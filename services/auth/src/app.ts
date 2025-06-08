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
// TODO: Removed internalOnly middleware for now, will need a way to make sure that the request is coming from the internal network
app.use('/api/auth', authRoutes);

export default app;
