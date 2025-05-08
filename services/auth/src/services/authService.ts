import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

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

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { email, hashedPassword, displayName: 'User', acceptedTerms },
      });
      console.log('New user created:', newUser);
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      await tx.verificationToken.create({
        data: {
          email: newUser.email,
          token: verificationCode,
          type: 'email_verification',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      console.log('Verification token created:', verificationCode);
      if (!process.env.MAILER_API_KEY) {
        throw new Error('MAILER_API_KEY is not defined in the environment variables');
      }
      sgMail.setApiKey(process.env.MAILER_API_KEY);

      const pageLink = `${process.env.APP_URL}/register/confirm`;
      const verificationLink = `${pageLink}?email=${encodeURIComponent(newUser.email)}`;
      const verificationLinkWithCode = `${pageLink}?email=${encodeURIComponent(newUser.email)}&code=${verificationCode}`;

      const msg = {
        to: newUser.email,
        from: 'jonephil@oregonstate.edu', // Replace with your verified sender email
        subject: 'Verify your email address',
        text: `
          Your verification code is: ${verificationCode}

          This code will expire in 10 minutes.

          Click the link below to verify your email automatically:
          ${verificationLinkWithCode}

          If the button doesn't work, go to this page and enter your code manually:
          ${verificationLink}

          If you didn’t request this, you can safely ignore this email.
        `,
        html: `
          <p>Your verification code is: <strong>${verificationCode}</strong></p>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <p>Click the button below to verify your email automatically:</p>
          <p>
            <a href="${verificationLinkWithCode}"
              style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
          </p>
          <p>If the button doesn't work, you can manually enter your code at:</p>
          <p><a href="${verificationLink}">${verificationLink}</a></p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        `
      };

      await sgMail.send(msg);
      console.log('Verification email sent to:', newUser.email);
      return newUser;
    });

    return user;
  },

  confirmUser: async (email: string, code: string) => {
    return await prisma.$transaction(async (tx) => {
      const token = await tx.verificationToken.findFirst({
        where: {
          email,
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
