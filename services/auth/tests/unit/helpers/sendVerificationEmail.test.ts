import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockSendGrid } from '../../../testUtils/mocks/mockSendGrid';
import { sendVerificationEmail } from '../../../src/helpers/sendVerificationEmail';

describe('sendVerificationEmail', () => {
  const email = 'test@example.com';
  const code = '123456';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls sgMail.send with correct message content', async () => {
    await sendVerificationEmail(email, code);

    expect(mockSendGrid.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: expect.stringContaining('Verify'),
        text: expect.stringContaining(code),
        html: expect.stringContaining(code),
      })
    );
  });
});
