import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import bcrypt from 'bcrypt';
import { authService } from '../../../src/services/authService';
import { MultiValidationError } from '../../../src/errors/MultiValidationError';
import { sendVerificationEmail } from '../../../src/helpers/sendVerificationEmail';
import { prisma } from '../../../src/db/client';

// Helper
const asMock = <T>(fn: T) => fn as Mock;

// Mocks
vi.mock('../../../src/db/client', async () => {
  return {
    prisma: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
      verificationToken: {
        create: vi.fn(),
      },
      $transaction: vi.fn(),
    },
  };
});

describe('registerUser', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockConfirmPassword = 'password123';
  const mockAcceptedTerms = true;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws error if email is already registered', async () => {
    asMock(prisma.user.findUnique).mockResolvedValue({ id: 'existing-user-id' });

    await expect(authService.registerUser(mockEmail, mockPassword, mockConfirmPassword, mockAcceptedTerms))
      .rejects
      .toThrow(MultiValidationError);
  });
});