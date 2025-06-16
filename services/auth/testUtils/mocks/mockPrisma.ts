import type { PrismaClient } from '@prisma/client';
import { vi } from 'vitest';

const user = {
  findUnique: vi.fn(),
  create: vi.fn(),
};

const verificationToken = {
  create: vi.fn(),
};

const $transaction = vi.fn();

export const mockPrisma = {
  user,
  verificationToken,
  $transaction,
} as unknown as PrismaClient;
