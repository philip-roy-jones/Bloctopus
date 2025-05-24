import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyTaskOwnership(userId: string, taskId: string): Promise<void> {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { userId: true },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  if (task.userId !== userId) {
    throw new UnauthorizedError('Task does not belong to the user');
  }
}

export default verifyTaskOwnership;