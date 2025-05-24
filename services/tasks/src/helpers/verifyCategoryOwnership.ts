import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function verifyCategoryOwnership(userId: string, categoryId: string): Promise<void> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { userId: true },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  if (category.userId !== userId) {
    throw new UnauthorizedError("Category does not belong to the user");
  }
}
