import { Response } from "express";
import { AuthRequest } from "../interfaces/auth.interfaces";
import { AuthService } from "../services/auth.service";

export const handleLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { uid, email, name, picture } = req.user;

    const user = await AuthService.syncUser({
      uid,
      email,
      name,
      image: picture,
    });

    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
