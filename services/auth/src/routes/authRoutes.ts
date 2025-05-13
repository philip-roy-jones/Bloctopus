import { Router } from 'express';
import { register, confirmRegistration, login, resendVerification, forgotPassword } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/register/resend', resendVerification )
router.post('/register/confirm', confirmRegistration);
router.post('/login', login);
router.post('/forgot', forgotPassword)

export default router;
