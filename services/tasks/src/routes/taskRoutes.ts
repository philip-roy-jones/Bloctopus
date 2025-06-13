import { Router } from 'express';
import { index, create, destroy, update, show } from '../controllers/taskController';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.patch('/:id', update)
router.delete('/:id', destroy);

export default router;
