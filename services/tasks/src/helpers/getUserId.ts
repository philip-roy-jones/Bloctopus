import { Request, Response } from 'express';

export const getUserId = (req: Request, res: Response): string | undefined => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }
  return userId;
};
