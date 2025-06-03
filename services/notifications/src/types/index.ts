export interface CreateReminderData {
  taskId: number
  userId: string
  title: string
  startTime: string // ISO string
  endTime: string // ISO string
  remindAt: string // ISO string
}

export interface Reminder{
  taskId: number
  userId: string
  title: string
  startTime: Date // ISO string converted to Date
  endTime: Date // ISO string converted to Date
  remindAt: Date // ISO string converted to Date
}