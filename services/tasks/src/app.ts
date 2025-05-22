import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { internalOnly } from './middleware/internalOnly';

const app = express();

app.use(cors({ origin: "localhost:5173", credentials: true }));
app.use(express.json());
app.use('/api/tasks', internalOnly, taskRoutes);

export default app;
