import { createRabbitChannel } from '@philip-roy-jones/taskify-lib';
import { ConsumeMessage } from 'amqplib';
import { RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } from '@/config/config';
import { handleCreateReminder } from '@/jobs/createReminder';
import { handleUpdateReminder } from '@/jobs/updateReminder';
import { handleDestroyReminder } from '@/jobs/destroyReminder';

export async function startReminderConsumer() {
  const { channel } = await createRabbitChannel(
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASSWORD
  );
  const queue = 'task_reminder_events';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    console.log('Received message:', msg.content.toString());
    try {
      const { type, data } = JSON.parse(msg.content.toString());

      switch (type) {
        case "create":
          await handleCreateReminder(data);
          break
        case "update":
          await handleUpdateReminder(data);
          break
        case "destroy":
          await handleDestroyReminder(data.taskId);
          break
        default:
          console.warn('Unknown event type', type);
      }

      channel.ack(msg);
    } catch (error) {
      console.error('Error processing message:', error);
      channel.nack(msg, false, false); // Reject the message without requeueing
    }
  });

  console.log('✅ Notification service listening for task reminder events...');
}
