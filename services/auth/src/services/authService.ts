import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { sendVerificationEmail } from '../helpers/sendVerificationEmail';
import { sendPasswordResetEmail } from '../helpers/sendPasswordResetEmail';
import jwt from 'jsonwebtoken';
import { AUTH_SECRET, PASSWORD_RESET_SECRET, PASSWORD_RESET_DURATION, SESSION_EXPIRATION } from '../config/config';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { validatePasswordReset, validateRegistration, validateForgotPassword, validatePasswordResetCode } from '../helpers/authUtils';
import { MultiValidationError } from '../errors/MultiValidationError';

if (!AUTH_SECRET) {
  throw new Error('AUTH_SECRET is not defined in the environment variables');
}
if (!PASSWORD_RESET_SECRET) {
  throw new Error('PASSWORD_RESET_SECRET is not defined in the environment variables');
}

const prisma = new PrismaClient();

export const authService = {
  validate: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if (!user) throw new UnauthorizedError('User not found');

      if (!user.isVerified) throw new UnauthorizedError('Email not verified');

      // Optionally, you can return user details or just a success message
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.displayName,
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.error('Unauthorized access attempt rethrowing...');
        throw error; // Re-throw UnauthorizedError to be handled by the controller
      }
      console.error('Error validating user:', error);
      throw new Error('Internal server error during validation');
    }
  },

  getUserEmail: async (userId: string) => {
    if (!userId) throw new Error('User ID is required');
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');
    return { email: user.email };
  },

  registerUser: async (email: string, password: string, confirmPassword: string, acceptedTerms: boolean) => {
    const errors = validateRegistration(email, password, confirmPassword, acceptedTerms);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      errors.push({ field: "email", message: "User is already registered with this email" });
    }

    if (errors.length) throw new MultiValidationError(errors);

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { email, hashedPassword, displayName: 'User', acceptedTerms },
      });
      console.log('New user created:', newUser);

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      await tx.verificationToken.create({
        data: {
          userId: newUser.id,
          token: verificationCode,
          type: 'email_verification',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      console.log('Verification token created:', verificationCode);

      // Send verification email
      await sendVerificationEmail(newUser.email, verificationCode);
    });
  },

  resendVerificationEmail: async (email: string) => {
    if (!email) throw new Error('Email is required');

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('User is already verified');

    // Destroy all existing email_verification tokens
    await prisma.verificationToken.deleteMany({
      where: {
        userId: user.id,
        type: 'email_verification',
      },
    });

    // Create a new verification token
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const token = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationCode,
        type: 'email_verification',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    sendVerificationEmail(user.email, token.token); // Uncomment when you implement the email logic
  },

  confirmUser: async (email: string, code: string) => {
    if (!email || !code) throw new Error('Email and verification code are required');

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('User is already verified');

    return await prisma.$transaction(async (tx) => {
      const token = await tx.verificationToken.findFirst({
        where: {
          userId: user.id,
          token: code,
          type: 'email_verification',
          expiresAt: { gte: new Date() },
        },
      });

      if (!token) throw new Error('Invalid or expired verification code');

      await tx.verificationToken.delete({ where: { id: token.id } });
      await tx.user.update({ where: { email }, data: { isVerified: true } });
    });
  },

  forgotPassword: async (email: string) => {
    const errors = validateForgotPassword(email);

    if (errors.length) throw new MultiValidationError(errors);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return;

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: resetCode,
        type: 'password_reset',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetCode);
  },

  confirmForgotPassword: async (code: string) => {
    const errors = validatePasswordResetCode(code);

    if (errors.length) throw new MultiValidationError(errors);

    const token = await prisma.verificationToken.findFirst({
      where: {
        token: code,
        type: 'password_reset',
        expiresAt: { gte: new Date() },
      },
    });

    if (!token) {
      errors.push({ field: 'code', message: 'Invalid or expired password reset code' });
      throw new MultiValidationError(errors);
    }

    // Generates a JWT for password reset, valid for 10 minutes
    const jwtToken = jwt.sign(
      { userId: token.userId, type: 'password_reset' },
      PASSWORD_RESET_SECRET as string,
      { expiresIn: PASSWORD_RESET_DURATION / 1000 }
    );
    return jwtToken;
  },

  resetPassword: async (newPassword: string, confirmNewPassword: string, token: string,) => {
    const errors = validatePasswordReset(newPassword, confirmNewPassword, token);

    if (errors.length) throw new MultiValidationError(errors);

    const decoded = jwt.verify(token, PASSWORD_RESET_SECRET as string) as unknown as { userId: string; };

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { id: Number(decoded.userId) },
      data: { hashedPassword },
    });
  },

  loginUser: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedError('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) throw new UnauthorizedError('Invalid password');

    if (!user.isVerified) throw new UnauthorizedError('Email not verified');

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      AUTH_SECRET as string,
      { expiresIn: Math.floor(SESSION_EXPIRATION / 1000) }
    );
    return token;
  },

  logoutUser: async (token: string) => {
    // TODO: Invalidate the user's session by blacklisting JWT
    console.log('Logging out user with token:', token);
  },


  getMe: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');
    if (!user.isVerified) throw new Error('Email not verified');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    };
  }
};

// Ensure Prisma disconnects when the application shuts down
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
