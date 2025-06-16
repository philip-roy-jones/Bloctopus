import { vi } from 'vitest';

export const mockSendGrid = {
  setApiKey: vi.fn(),
  send: vi.fn(),
};

// Register the mock
vi.mock('@sendgrid/mail', () => ({
  default: mockSendGrid,
}));
