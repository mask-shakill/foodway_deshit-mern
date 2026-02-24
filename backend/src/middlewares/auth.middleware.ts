import { Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';
import { AuthRequest } from '../interfaces/auth.interfaces';

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.dbUser?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};