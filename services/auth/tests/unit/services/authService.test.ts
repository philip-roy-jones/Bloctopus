import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MultiValidationError } from '../../../src/errors/MultiValidationError';
import { mockPrisma } from '../../../testUtils/mocks/mockPrisma';
import { authService } from '../../../src/services/authService';

vi.mock('../../../src/db/client', () => ({
  prisma: mockPrisma,
}));

describe('registerUser', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockConfirmPassword = 'password123';
  const mockAcceptedTerms = true;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws error if email is already registered', async () => {
    mockPrisma.user.findUnique = vi.fn().mockResolvedValue({ id: 'existing-user-id' });

    await expect(authService.registerUser(mockEmail, mockPassword, mockConfirmPassword, mockAcceptedTerms))
      .rejects
      .toThrow(MultiValidationError);
  });
});