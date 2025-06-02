import { Queue } from 'bullmq';
import { REDIS_HOST, REDIS_PORT } from '@/config/config';

export const reminderQueue = new Queue("reminder-queue", {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  }
})
