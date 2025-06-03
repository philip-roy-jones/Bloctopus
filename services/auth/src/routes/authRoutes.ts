import { Router } from 'express';
import { register, confirmRegistration, login, resendVerification, forgotPassword, getMe, confirmForgotPassword, resetPassword, logout, validate, getUserEmail } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/validate', authenticate, validate)
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.get('/users/:id/email', getUserEmail )         // TODO: this should be protected, but short on time
router.post('/register', register);
router.post('/register/resend', resendVerification );
router.post('/register/confirm', confirmRegistration);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/forgot/confirm',  confirmForgotPassword);
router.post('/forgot/reset', resetPassword);

export default router;
