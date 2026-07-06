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

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }

        req.user = user;
        next();
    })
}