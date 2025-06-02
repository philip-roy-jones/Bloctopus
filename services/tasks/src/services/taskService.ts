import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateTaskInput, CreateTaskInput } from '../types/Task';
import { verifyOwnership } from '@/helpers/verifyOwnership';
import { linkCategoriesToTaskTx } from './taskCategoryService';
import { publishReminder } from '@/events/publishReminder';
import { ReminderInput } from '@/types/Reminder';

const prisma = new PrismaClient();

export const taskService = {
  async create(userId: string, data: CreateTaskInput) {
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const { categoryIds = [], ...taskData } = data;

      const task = await tx.task.create({
        data: {
          userId: parseInt(userId, 10),
          ...taskData,
          completed: false, // Force as false
        },
      });

      if (categoryIds.length > 0) {
        await linkCategoriesToTaskTx(tx, { taskId: task.id, categoryIds: categoryIds.map(id => parseInt(id, 10)) });
      }

      if (taskData.startTime && taskData.endTime) {
        const reminder: ReminderInput = {
          type: 'create',
          data: {
            taskId: task.id.toString(),
            userId: userId,
            title: taskData.title,
            startTime: new Date(taskData.startTime),
            endTime: new Date(taskData.endTime),
            remindAt: new Date(new Date(taskData.startTime).getTime() - 600_000) // Remind 10 minutes before startTime
          }
        }

        // Add message to rabbitmq
        await publishReminder(reminder);
      }

      return tx.task.findUnique({
        where: { id: task.id },
        include: { categories: true },
      });
    });
  },

  async show(userId: string, id: string) {
    await verifyOwnership('task', userId, id);

    return await prisma.task.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  },

  async index(userId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    return await prisma.task.findMany({
      where: { userId: parseInt(userId, 10) },
      skip,
      take: pageSize,
    });
  },

  async update(userId: string, id: string, data: UpdateTaskInput) {
    await verifyOwnership('task', userId, id);

    return await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data,
    });
  },

  async destroy(userId: string, id: string) {
    await verifyOwnership('task', userId, id);

    return await prisma.task.delete({
      where: { id: parseInt(id, 10) },
    });
  },
};

// Ensure Prisma disconnects when the application shuts down
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});