import { Router } from "express";
import { handleLogin } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", verifyToken, handleLogin);

export default router;
