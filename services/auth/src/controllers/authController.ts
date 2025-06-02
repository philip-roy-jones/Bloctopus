import { RequestHandler } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../@types/express';
import { PASSWORD_RESET_DURATION, SESSION_EXPIRATION } from '../config/config';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { MultiValidationError } from '../errors/MultiValidationError';

export const validate: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  try {
    if (req.get('X-Internal-Request') !== 'true') {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    if (req.user) {
      try {
        await authService.validate(req.user.userId);
      } catch (error: any) {
        if (error instanceof UnauthorizedError) {
          res.status(401).json({ error: error.message || 'Unauthorized' });
          return;
        }
        throw error;
      }

      res.setHeader('X-User-ID', req.user.userId);
    } else {
      res.status(400).json({ error: 'User information is missing' });
      return;
    }
    res.sendStatus(200);
  } catch (error: any) {
    console.error('Error setting headers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const register: RequestHandler = async (req, res) => {
  try {
    await authService.registerUser(req.body.email, req.body.password, req.body.confirmPassword, req.body.acceptedTerms);
    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error: any) {
    if (error instanceof MultiValidationError) {
      res.status(400).json(error.errors);
      return;
    }
    res.status(500).json({ message: error.message || 'Registration failed' });
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

export const forgotPassword: RequestHandler = async (req, res) => {                     // Enter email
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
}

export const confirmForgotPassword: RequestHandler = async (req, res) => {              // Enter code
  try {
    const { code } = req.body;
    const jwt = await authService.confirmForgotPassword(code);
    res.cookie('resetPasswordCookie', jwt, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: PASSWORD_RESET_DURATION });
    res.status(200).json({ message: 'Code is valid' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {                      // Enter new password
  try {
    const resetPasswordCookie = req.cookies.resetPasswordCookie;
    if (!resetPasswordCookie) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const { newPassword, confirmNewPassword } = req.body;
    await authService.resetPassword(newPassword, confirmNewPassword, resetPasswordCookie);
    res.clearCookie('resetPasswordCookie');
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Password reset failed' });
  }
}

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await authService.loginUser(email, password);
    res.cookie('sessionCookie', jwtToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: SESSION_EXPIRATION });
    res.status(200).json({ message: 'Login successful' });
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      console.log('Unauthorized access attempt:', error);
      res.status(401).json({ error: error.message || 'Unauthorized' });
    } else {
      console.log('Login error:', error);
      res.status(400).json({ error: error.message || 'Login failed' });
    }
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.sessionCookie;
    await authService.logoutUser(token);
    res.clearCookie('sessionCookie');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Logout failed' });
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
