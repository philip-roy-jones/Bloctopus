import { Worker } from "bullmq"
import { REDIS_HOST, REDIS_PORT } from "@/config/config"

export async function startReminderWorker() {
  new Worker("reminder-queue", async job => {
    const remindAtEST = new Date(job.data.remindAt).toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log(`Reminder Time (EST): ${remindAtEST}`);

    const startTimeEST = new Date(job.data.startTime).toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log(`Start Time (EST): ${startTimeEST}`);

    const endTimeEST = new Date(job.data.endTime).toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log(`End Time (EST): ${endTimeEST}`);

    const { taskId, title, userId } = job.data
    console.log(`🔔 Sending reminder for task #${taskId} (${title}) to user ${userId}`)
    // You could send an email, push, SMS, etc.
  }, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
  })

  console.log("✅ Reminder worker started")
}
