import { PrismaClient } from '@prisma/client';

export const linkCategoriesToTaskTx = async (
  tx: PrismaClient,
  {
    taskId,
    categoryIds,
  }: {
    taskId: number;
    categoryIds: number[];
  }
) => {
  await tx.task.update({
    where: { id: taskId },
    data: {
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });
};
