import { Router } from 'express';
import { register, confirmRegistration, login, resendVerification, forgotPassword, confirmForgotPassword, resetPassword, logout } from '../controllers/authController';
import { requireUserId } from '@philip-roy-jones/bloctopus-lib';

const router = Router();

router.post('/logout', requireUserId, logout);
router.post('/register', register);
router.post('/verification/resend', resendVerification );
router.post('/verification', confirmRegistration);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/verify-code', confirmForgotPassword);
router.post('/reset-password', resetPassword);

export default router;
