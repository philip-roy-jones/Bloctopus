import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: This is all AI boilerplate, review and adjust as necessary
export const categoryService = {
  async index(userId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    return await prisma.task.findMany({
      where: { userId: parseInt(userId, 10) },
      skip,
      take: pageSize,
    });
  },

  async create(userId: string, data: any) {
    console.log('Creating category with data:', data);

    return await prisma.$transaction(async (prisma: PrismaClient) => {
      const category = await prisma.category.create({
        data: {
          userId: parseInt(userId, 10),
          ...data,
        },
      });

      return category;
    });
  },

  async update(userId: string, id: string, data: any) {
    const castedId = parseInt(id, 10);
    
    // Verify ownership
    const category = await prisma.category.findUnique({
      where: { id: castedId },
      select: { userId: true },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    if (category.userId !== parseInt(userId, 10)) {
      throw new Error('Unauthorized: Category does not belong to the user');
    }

    return await prisma.category.update({
      where: { id: castedId },
      data,
    });
  },

  async destroy(userId: string, id: string) {
    const castedId = parseInt(id, 10);
    
    // Verify ownership
    const category = await prisma.category.findUnique({
      where: { id: castedId },
      select: { userId: true },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    if (category.userId !== parseInt(userId, 10)) {
      throw new Error('Unauthorized: Category does not belong to the user');
    }

    return await prisma.category.delete({
      where: { id: castedId },
    });
  }
}