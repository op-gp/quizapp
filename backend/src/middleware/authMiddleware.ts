import type { NextFunction, Response } from 'express';
import type { Request } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: 'Admin' | 'Student' | 'SuperAdmin';
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const accessSecretToken = process.env.ACCESS_SECRET_TOKEN;

  if (!accessSecretToken) {
    console.error('authMiddleware.ts: ACCESS_SECRET_TOKEN not set in .env');
    return res.status(500).json({ message: 'Missing access token' });
  }

  jwt.verify(token, accessSecretToken, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

export const verifyRole = (allowedRoles: ('Admin' | 'Student' | 'SuperAdmin')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    const isSuperAdmin = userRole === 'SuperAdmin';
    const isAllowed = allowedRoles.includes(userRole) || (isSuperAdmin && allowedRoles.includes('Admin'));

    if (!isAllowed) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};
