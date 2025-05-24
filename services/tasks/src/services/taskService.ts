import { PrismaClient } from '@prisma/client';
import verifyTaskOwnership from '../helpers/verifyTaskOwnership';
import verifyCategoryOwnership from '../helpers/verifyCategoryOwnership';
import { TaskData } from '../types/TaskData';

const prisma = new PrismaClient();

export const taskService = {
  async createTask(userId: string, data: TaskData) {
    const categoryExists = await prisma.Category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundError('Category does not exist');
    }

    return await prisma.$transaction(async (prisma: PrismaClient) => {
      const task = await prisma.task.create({
        data: {
          userId,
          data
        },
      });

      if (data.categoryId) {
        const categoryId = data.categoryId;

        await verifyCategoryOwnership(userId, categoryId);

        await prisma.taskCategory.create({
          data: {
            taskId: task.id,
            categoryId,
          },
        });
      }

      return task;
    });
  },

  async getTaskById(userId: string, id: string) {
    await verifyTaskOwnership(userId, id);
    return await prisma.task.findUnique({
      where: { id },
    });
  },

  async getAllTasks(userId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    return await prisma.task.findMany({
      where: { userId },
      skip,
      take: pageSize,
    });
  },

  async updateTask(userId: string, id: string, data: TaskData) {
    await verifyTaskOwnership(userId, id);

    return await prisma.task.update({
      where: { id },
      data,
    });
  },

  async deleteTask(userId: string, id: string) {
    await verifyTaskOwnership(userId, id);

    return await prisma.task.delete({
      where: { id },
    });
  },
};

// Ensure Prisma disconnects when the application shuts down
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});