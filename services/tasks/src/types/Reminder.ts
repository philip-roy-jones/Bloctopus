export interface ReminderInput {
  type: string;
  data: {
    taskId: string;
    userId: string;
    title: string;
    startTime: Date;
    endTime: Date;
    remindAt: Date;
  }
}