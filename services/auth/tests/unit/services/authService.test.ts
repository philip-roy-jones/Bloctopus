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

vi.mock('../../../src/config/config', async () => {
  return {
    PASSWORD_RESET_SECRET: 'mock-reset-secret',
    SESSION_EXPIRATION: 1000 * 60 * 10,
    PASSWORD_RESET_DURATION: 1000 * 60 * 10,
    PRIVATE_KEY: 'FAKE_PRIVATE_KEY',
    WEB_URL: 'http://localhost:3000',
    MAILER_API_KEY: 'SG._FAKE_MAIL_KEY',
    COOKIE_OPTIONS: {},
  };
});

import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MultiValidationError } from '../../../src/errors/MultiValidationError';
import { prisma } from '../../../src/db/client';

// Helper
const asMock = <T>(fn: T) => fn as Mock;

import { authService } from '../../../src/services/authService';

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