import { reminderQueue } from "@/queues"
import { CreateReminderData } from "@/types"

export async function handleUpdateReminder(data: CreateReminderData) {
  const jobId = `reminder-${data.taskId}`

  // Remove old job
  const oldJob = await reminderQueue.getJob(jobId)
  if (oldJob) await oldJob.remove()

  // Schedule new job
  await reminderQueue.add(jobId, data, {
    jobId,
    timestamp: new Date(data.remindAt).getTime()
  })
}
