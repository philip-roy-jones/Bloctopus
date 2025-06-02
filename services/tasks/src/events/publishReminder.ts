import { createRabbitChannel } from '@philip-roy-jones/taskify-lib';
import { RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } from '@/config/config';
import { ReminderInput } from '@/types/Reminder';

export async function publishReminder(reminder: ReminderInput) {
  const { channel, connection } = await createRabbitChannel(
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASSWORD
  );

  const queue = 'task_reminder_events';
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(reminder)), {
    persistent: true,
  });

  setTimeout(() => connection.close(), 500);
}
