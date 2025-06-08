import { Router } from 'express';
import { register, confirmRegistration, login, resendVerification, forgotPassword, getMe, confirmForgotPassword, resetPassword, logout, getUserEmail } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.get('/users/:id/email', getUserEmail )         // TODO: this should be protected, but short on time
router.post('/register', register);
router.post('/verification/resend', resendVerification );
router.post('/verification', confirmRegistration);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/verify-code', confirmForgotPassword);
router.post('/reset-password', resetPassword);

export default router;
