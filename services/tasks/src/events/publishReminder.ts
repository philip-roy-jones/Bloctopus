import { createRabbitChannel } from '@libs/rabbit';

export async function publishReminder(task: {
  taskId: string;
  userId: string;
  title: string;
  remindAt: string;
}) {
  const { channel, connection } = await createRabbitChannel();

  const queue = 'task_reminder_scheduled';
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
    persistent: true,
  });

  console.log('📤 Published TASK_REMINDER_SCHEDULED:', task);
  setTimeout(() => connection.close(), 500);
}
