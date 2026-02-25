import { Router } from "express";
import multer from "multer";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getCategories);

router.post("/", verifyToken, isAdmin, upload.single("image"), createCategory);

export default router;
