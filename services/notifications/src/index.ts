import { startReminderConsumer } from './events/consumer';
import { startReminderWorker } from './workers/sendReminderWorker';

async function main() {
  await startReminderConsumer();
  await startReminderWorker();
}

main();