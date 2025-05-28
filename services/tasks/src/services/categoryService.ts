import { PrismaClient } from '@prisma/client';
import { verifyOwnership } from '@/helpers/verifyOwnership';

const prisma = new PrismaClient();

export const categoryService = {
  async index(userId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    return await prisma.category.findMany({
      where: { userId: parseInt(userId, 10) },
      skip,
      take: pageSize,
    });
  },

  async create(userId: string, data: Category) {
    console.log('Creating category with data:', data);

    return await prisma.$transaction(async (prisma: PrismaClient) => {
      const category = await prisma.category.create({
        data: {
          userId: parseInt(userId, 10),
          ...data
        }
      });

      return category;
    });
  },

  async update(userId: string, recordId: string, data: Category) {
    await verifyOwnership('category', userId, recordId);

    return await prisma.category.update({
      where: { id: recordId },
      data,
    });
  },

  async destroy(userId: string, recordId: string) {
    await verifyOwnership('category', userId, recordId);

    return await prisma.category.delete({
      where: { id: recordId },
    });
  }
}