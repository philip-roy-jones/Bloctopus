import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

const prisma = new PrismaClient();

type Model = 'task' | 'category';

export async function verifyOwnership(
  model: Model,
  userId: string | number,
  recordId: string | number
): Promise<void> {
  const numericUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  const numericRecordId = typeof recordId === 'string' ? parseInt(recordId, 10) : recordId;

  const entity = await prisma[model].findUnique({
    where: { id: numericRecordId },
    select: { userId: true },
  });

  if (!entity) {
    throw new NotFoundError(`${capitalize(model)} not found`);
  }

  if (entity.userId !== numericUserId) {
    throw new UnauthorizedError(`${capitalize(model)} does not belong to the user`);
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
