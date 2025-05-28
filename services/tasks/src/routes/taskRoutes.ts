import { Router } from 'express';
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/taskController';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask);

export default router;
