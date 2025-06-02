import { Prisma, PrismaClient } from '@prisma/client';
import { Task } from '../types/Task';
import { verifyOwnership } from '@/helpers/verifyOwnership';
import { linkCategoriesToTaskTx } from './taskCategoryService';
import { CreateTaskInput } from '../types/Task';

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

  async update(userId: string, id: string, data: Task) {
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