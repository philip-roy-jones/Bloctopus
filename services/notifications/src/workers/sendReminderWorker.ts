import { Worker } from "bullmq"
import { REDIS_HOST, REDIS_PORT } from "@/config/config"
import { sendReminderEmail } from "@/services/emailService"
import { Reminder } from "@/types"
import { fetchUserEmail } from "@/services/authService"

export async function startReminderWorker() {
  new Worker("reminder-queue", async job => {
    // You could send an email, push, SMS, etc.
    const { taskId, userId, title, startTime, endTime, remindAt } = job.data
    const email = await fetchUserEmail(userId)
    
    const reminder: Reminder = {
      taskId,
      userId,
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      remindAt: new Date(remindAt)
    }

    await sendReminderEmail(email, reminder)
  }, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
  })

  console.log("✅ Reminder worker started")
}
