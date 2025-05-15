import { RequestHandler } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../@types/express';

export const register: RequestHandler = async (req, res) => {
  try {
    console.log("route hit");
    await authService.registerUser(req.body.email, req.body.password, req.body.acceptedTerms);
    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

export const resendVerification: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.resendVerificationEmail(email);
    res.status(200).json({ message: 'Verification email resent successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Resending verification email failed' });
  }
}

export const confirmRegistration: RequestHandler = async (req, res) => {
  try {
    await authService.confirmUser(req.body.email, req.body.verificationCode);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Verification failed' });
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
}

export const confirmForgotPassword: RequestHandler = async (req, res) => {
  try {
    const { code } = req.body;
    const jwt = await authService.confirmForgotPassword(code);
    // TODO: Send the JWT back to the client
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await authService.loginUser(email, password);
    res.cookie('sessionCookie', jwtToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Login successful' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Login failed' });
  }
};

export const getMe: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  try {
    const userParam = req.user;
    if (!userParam) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await authService.getMe(userParam.userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to fetch user' });
  }
};
