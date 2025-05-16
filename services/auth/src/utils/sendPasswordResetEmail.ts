import sgMail from '@sendgrid/mail';
import { WEB_URL } from '../config';
import { MAILER_API_KEY } from '../config';

if (!MAILER_API_KEY) {
  throw new Error('MAILER_API_KEY is not defined in the environment variables');
}

sgMail.setApiKey(MAILER_API_KEY);

export const sendPasswordResetEmail = async (email: string, passwordResetCode: string) => {
  const pageLink = `${WEB_URL}/forgot/confirm`;
  const resetLink = `${pageLink}?email=${encodeURIComponent(email)}`;
  const resetLinkWithCode = `${pageLink}?email=${encodeURIComponent(email)}&code=${passwordResetCode}`;

  const msg = {
    to: email,
    from: 'jonephil@oregonstate.edu',
    subject: 'Reset your password',
    text: `
      Your password reset code is: ${passwordResetCode}

      This code will expire in 10 minutes.

      Click the link below to reset your password automatically:
      ${resetLinkWithCode}

      If the button doesn't work, go to this page and enter your code manually:
      ${resetLink}

      If you didn't request this, you can safely ignore this email.
    `,
    html: `
      <p>Your password reset code is: <strong>${passwordResetCode}</strong></p>
      <p>This code will expire in <strong>10 minutes</strong>.</p>
      <p>Click the button below to reset your password automatically:</p>
      <p>
        <a href="${resetLinkWithCode}"
          style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
      </p>
      <p>If the button doesn't work, you can manually enter your code at:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
};
