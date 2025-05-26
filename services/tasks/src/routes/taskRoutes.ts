import { Router } from 'express';
import { getTasksByUser, createTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.post('/tasks/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Test route' });
});

router.get('/tasks', getTasksByUser);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);

export default router;
