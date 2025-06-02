import { reminderQueue } from "@/queues"
import { CreateReminderData } from "@/types"

export async function handleCreateReminder(data: CreateReminderData) {
  await reminderQueue.add(`reminder-${data.taskId}`, data, {
    jobId: `reminder-${data.taskId}`,
    timestamp: new Date(data.remindAt).getTime()
  })
}
