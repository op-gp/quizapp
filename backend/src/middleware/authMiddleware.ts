// import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { throwDeprecation } from 'node:process';

export const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message: "No token provided"})
    }

    // Tokens are usually formatted like "Bearer <token>" so the below split(" ") would create an array ["Bearer", <token>].    
    const token = authHeader.split(" ")[1];

    const accessSecretToken = process.env.ACCESS_SECRET_TOKEN;

    if (!accessSecretToken){
        console.error("authMiddleware.ts: ACCESS_SECRET_TOKEN not set in .env");
        return res.status(500).json({ message: "Missing access token" });
    }

    jwt.verify(token, accessSecretToken, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }

        req.user = user;
        next();
    })
}

export const verifyRole = (allowedRoles: ('student' | 'admin' | 'superadmin')[]) => {
  return (req: any, res: any, next: any) => {
    const userRole = req.user?.role;

    if (userRole !== allowedRoles) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    
    // SuperAdmin automatically pass role checks intended for admins
    const isSuperAdmin = req.user.role === 'superadmin';
    const isAllowed = allowedRoles.includes(req.user.role) || (isSuperAdmin && allowedRoles.includes('admin'));

    if (!isAllowed) {
      res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      return;
    }
    next();
  };
};
