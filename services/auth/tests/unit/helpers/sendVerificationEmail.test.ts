import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendVerificationEmail } from '../../../src/helpers/sendVerificationEmail';
import sgMail from '@sendgrid/mail';

// Mock the @sendgrid/mail module
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn(),
  },
}));

describe('sendVerificationEmail', () => {
  const email = 'test@example.com';
  const code = '123456';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls sgMail.send with correct message content', async () => {
    await sendVerificationEmail(email, code);

    expect(sgMail.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: expect.stringContaining('Verify'),
        text: expect.stringContaining(code),
        html: expect.stringContaining(code),
      })
    );
  });
});
