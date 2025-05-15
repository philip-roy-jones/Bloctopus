import { Router } from 'express';
import { register, confirmRegistration, login, resendVerification, forgotPassword, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/register/resend', resendVerification );
router.post('/register/confirm', confirmRegistration);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/forgot', forgotPassword);

export default router;
