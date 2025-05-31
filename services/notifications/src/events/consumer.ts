import { createRabbitChannel } from '@philip-roy-jones/taskify-lib';
import { ConsumeMessage } from 'amqplib';
import { RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } from '@/config/config';

export async function startReminderConsumer() {
  const { channel } = await createRabbitChannel(
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASSWORD
  );
  const queue = 'task_reminder_scheduled';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    console.log('📥 Received TASK_REMINDER_SCHEDULED:', data);

    // TODO: Schedule with BullMQ for sending reminders
    channel.ack(msg);
  });

  console.log('✅ Notification service listening for TASK_REMINDER_SCHEDULED...');
}
