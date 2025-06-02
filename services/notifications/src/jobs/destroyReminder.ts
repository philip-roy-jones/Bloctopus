import { reminderQueue } from "@/queues"

export async function handleDestroyReminder(taskId: number) {
  const job = await reminderQueue.getJob(`reminder-${taskId}`)
  if (job) await job.remove()
}
