import { Router } from 'express';
import { getTasksByUser } from '../controllers/taskController';

const router = Router();

router.post('/tasks/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Test route' });
});

router.get('/tasks', getTasksByUser);

export default router;
