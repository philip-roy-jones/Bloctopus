import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/errors/NotFoundError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

const prisma = new PrismaClient();

async function verifyTaskOwnership(userId: string, taskId: string): Promise<void> {
  const castedUserId = parseInt(userId, 10);
  const castedId = parseInt(taskId, 10);

  const task = await prisma.task.findUnique({
    where: { id: castedId },
    select: { userId: true },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  if (task.userId !== castedUserId) {
    throw new UnauthorizedError('Task does not belong to the user');
  }
}

export default verifyTaskOwnership;