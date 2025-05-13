import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import { sendPasswordResetEmail } from '../utils/sendPasswordResetEmail';
import jwt from 'jsonwebtoken';

dotenv.config();

const prisma = new PrismaClient();

export const authService = {
  registerUser: async (email: string, password: string, acceptedTerms: boolean) => {
    if (!email || !password) throw new Error('Email and password are required');
    if (!acceptedTerms) throw new Error('You must accept the terms and conditions');

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User is already registered with this email');
    }

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
    if (!email) throw new Error('Email is required');

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('User not found');
    if (!user.isVerified) throw new Error('Email not verified');

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const token = await prisma.verificationToken.create({
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
    if (!code) throw new Error('Verification code is required');

    const token = await prisma.verificationToken.findFirst({
      where: {
        token: code,
        type: 'password_reset',
        expiresAt: { gte: new Date() },
      },
    });

    if (!token) throw new Error('Invalid or expired verification code');

    // TODO: return jwt token for password reset
  },

  loginUser: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) throw new Error('Invalid password');

    if (!user.isVerified) throw new Error('Email not verified');

    // Optionally, you can return user data or a token here
    const { id, email: userEmail, role, displayName } = user;
    return { id, email: userEmail, role, displayName };
  }
};
