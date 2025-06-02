import { Router } from 'express';
import { index, create, destroy, update, show } from '../controllers/taskController';

const router = Router();

router.get('/tasks', index);
router.get('/tasks/:id', show);
router.post('/tasks', create);
router.patch('/tasks/:id', update)
router.delete('/tasks/:id', destroy);

export default router;
