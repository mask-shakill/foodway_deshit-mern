import { Router } from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  productSchema,
  updateProductSchema,
} from "../validation/product.validation";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  validate(productSchema),
  createProduct,
);

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
