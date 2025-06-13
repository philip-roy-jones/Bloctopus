import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { injectUserId } from '@philip-roy-jones/bloctopus-lib';

const app = express();

app.use(cors({ origin: "localhost:5173", credentials: true }));
app.use(express.json());
app.use(injectUserId);

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

export default app;
