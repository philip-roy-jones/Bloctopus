import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

export const confirmRegistration = async (req: Request, res: Response) => {
  try {
    await authService.confirmUser(req.body.email, req.body.verificationCode);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Verification failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  // TODO — implement your login logic here later
  res.status(200).json({ message: 'Login endpoint not implemented yet' });
};
