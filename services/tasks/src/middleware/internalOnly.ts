// Copied middleware - shared by all internal services to restrict external access
// If this grows or changes often, consider moving to a shared package

import { Request, Response, NextFunction } from 'express';

export function internalOnly(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-internal-request'] !== 'true') {
    res.status(403).json({ message: 'Forbidden: Not an internal request' });
    return;
  }
  next();
}