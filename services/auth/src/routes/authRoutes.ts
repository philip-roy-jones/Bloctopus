import { Router } from 'express';
import { register, confirmRegistration, login } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/register/confirm', confirmRegistration);
router.post('/login', login);

export default router;
