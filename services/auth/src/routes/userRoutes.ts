import { Router } from 'express';
import { getUserEmail, getMe } from '../controllers/userController';
import { requireUserId } from '@philip-roy-jones/bloctopus-lib';

const router = Router();

router.get(':id/email', getUserEmail ) // TODO: for notifications service, need to make sure this can only be called within same network

router.get('/me', requireUserId, getMe)

export default router;