import { Router } from "express";
import multer from "multer";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.post("/", verifyToken, isAdmin, upload.single("image"), createCategory);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateCategory,
);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;
