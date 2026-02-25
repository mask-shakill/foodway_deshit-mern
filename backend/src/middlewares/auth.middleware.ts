import { Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import { AuthRequest } from "../interfaces/auth.interfaces";
import { supabase } from "../config/database";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. No authentication token provided." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    const { data: dbUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", decodedToken.email)
      .single();

    if (error || !dbUser) {
      return res.status(404).json({ error: "User not found in database" });
    }

    req.dbUser = dbUser;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.dbUser && req.dbUser.role === "admin") {
    return next();
  }

  return res.status(403).json({ error: "Admin access required" });
};
