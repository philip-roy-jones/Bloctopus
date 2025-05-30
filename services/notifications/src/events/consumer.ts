import { createRabbitChannel } from '@philip-roy-jones/taskify-lib';
import { ConsumeMessage } from 'amqplib';

export async function startReminderConsumer() {
  const { channel } = await createRabbitChannel();
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
