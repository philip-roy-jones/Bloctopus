import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({ message: err.message });
  } else {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}