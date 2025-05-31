import { createRabbitChannel } from '@philip-roy-jones/taskify-lib';
import { RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } from '@/config/config';

export async function publishReminder(task: {
  taskId: string;
  userId: string;
  title: string;
  remindAt: string;
}) {
  const { channel, connection } = await createRabbitChannel(
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASSWORD
  );

  const queue = 'task_reminder_scheduled';
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
    persistent: true,
  });

  console.log('📤 Published TASK_REMINDER_SCHEDULED:', task);
  setTimeout(() => connection.close(), 500);
}
