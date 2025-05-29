import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { internalOnly } from './middleware/internalOnly';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: "localhost:5173", credentials: true }));
app.use(express.json());

app.use('/api', internalOnly, taskRoutes);

app.use(errorHandler);

export default app;
