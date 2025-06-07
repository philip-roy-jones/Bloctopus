import sgMail from '@sendgrid/mail';
import { WEB_URL } from '../config/config';         // TODO: use frontend link to go to show task in email
import { MAILER_API_KEY } from '../config/config';
import { Reminder } from '@/types';

if (!MAILER_API_KEY) {
  throw new Error('MAILER_API_KEY is not defined in the environment variables');
}

sgMail.setApiKey(MAILER_API_KEY);

export const sendReminderEmail = async (email: string, reminder: Reminder) => {
  if (!email || !reminder) {
    throw new Error('Email and reminder data must be provided');
  }

  const msg = {
    to: email,
    from: 'jonephil@oregonstate.edu',
    subject: `🔔 Task Reminder: ${reminder.title}`,
    text: `
Hi there,

Just a quick reminder about your upcoming task: "${reminder.title}".

🕒 Start Time: ${reminder.startTime.toLocaleString()}
🕓 End Time: ${reminder.endTime.toLocaleString()}

Don't forget to take action if needed before it begins!

Best,
Bloctopus
    `,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>🔔 Task Reminder</h2>
        <p>Hi there,</p>
        <p>Just a quick reminder about your upcoming task:</p>
        <p><strong>${reminder.title}</strong></p>
        <ul>
          <li><strong>Start Time:</strong> ${reminder.startTime.toLocaleString()}</li>
          <li><strong>End Time:</strong> ${reminder.endTime.toLocaleString()}</li>
        </ul>
        <p>Don't forget to take action if needed before it begins!</p>
        <p>— Bloctopus</p>
      </div>
    `,
  };

  await sgMail.send(msg);
};
