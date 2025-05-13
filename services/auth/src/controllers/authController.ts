import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    console.log("route hit");
    await authService.registerUser(req.body.email, req.body.password, req.body.acceptedTerms);
    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authService.resendVerificationEmail(email);
    res.status(200).json({ message: 'Verification email resent successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Resending verification email failed' });
  }
}

export const confirmRegistration = async (req: Request, res: Response) => {
  try {
    await authService.confirmUser(req.body.email, req.body.verificationCode);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Verification failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
}

export const confirmForgotPassword = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const jwt = await authService.confirmForgotPassword(code);
    // TODO: Send the JWT back to the client
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Login failed' });
  }
};
