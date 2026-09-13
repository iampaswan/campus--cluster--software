import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utilities/utils';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = verifyToken(token) as { userId?: string };

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.userId = String(decoded.userId);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};