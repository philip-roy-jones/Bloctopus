import { reminderQueue } from "@/queues"
import { CreateReminderData } from "@/types"

export async function handleCreateReminder(data: CreateReminderData) {
  await reminderQueue.add(`reminder-${data.taskId}`, data, {
    jobId: `reminder-${data.taskId}`,
    delay: 10000,
    // delay: new Date(data.remindAt).getTime() - Date.now(),
    removeOnComplete: true,
    removeOnFail: true,
  })
}
