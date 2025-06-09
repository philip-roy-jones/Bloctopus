import { Router } from 'express';
import { getUserEmail, getMe } from '../controllers/userController';

const router = Router();

router.get(':id/email', getUserEmail ) // TODO: for notifications service, need to make sure this can only be called within same network

router.get('/me', getMe)

export default router;