import sgMail from '@sendgrid/mail';
import { WEB_URL } from '../config/config';
import { MAILER_API_KEY } from '../config/config';

if (!MAILER_API_KEY) {
  throw new Error('MAILER_API_KEY is not defined in the environment variables');
}

sgMail.setApiKey(MAILER_API_KEY);

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  const pageLink = `${WEB_URL}/register/confirm`;
  const verificationLink = `${pageLink}?email=${encodeURIComponent(email)}`;
  const verificationLinkWithCode = `${pageLink}?email=${encodeURIComponent(email)}&code=${verificationCode}`;

  const msg = {
    to: email,
    from: 'jonephil@oregonstate.edu',
    subject: 'Verify your email address',
    text: `
      Your verification code is: ${verificationCode}

      This code will expire in 10 minutes.

      Click the link below to verify your email automatically:
      ${verificationLinkWithCode}

      If the button doesn't work, go to this page and enter your code manually:
      ${verificationLink}

      If you didn't request this, you can safely ignore this email.
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
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
};
