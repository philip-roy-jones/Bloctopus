import { Worker } from "bullmq"
import { REDIS_HOST, REDIS_PORT } from "@/config/config"

export async function startReminderWorker() {
  new Worker("reminder-queue", async job => {
    // You could send an email, push, SMS, etc.
  }, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
  })

  console.log("✅ Reminder worker started")
}
