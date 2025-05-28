import { Router } from 'express';
import { index, create, update, destroy } from '../controllers/categoryController';

const router = Router();

router.get('/categories', index);
router.post('/categories', create);
router.patch('/categories/:id', update);
router.delete('/categories/:id', destroy);

export default router;
