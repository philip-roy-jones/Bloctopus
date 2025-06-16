import { prisma } from '../db/client';

export const userService = {
  getUserEmail: async (userId: string) => {
    if (!userId) throw new Error('User ID is required');
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');
    return { email: user.email };
  },

  getMe: async (userId: string) => {
    if (!userId) throw new Error('User ID is required');
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId, 10) } });
    if (!user) throw new Error('User not found');
    if (!user.isVerified) throw new Error('Email not verified');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    };
  }
}