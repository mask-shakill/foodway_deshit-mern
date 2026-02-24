import { Request } from "express";

export interface AuthRequest extends Request {
  user?: any;
  dbUser?: {
    id: string;
    role: string;
  };
}
