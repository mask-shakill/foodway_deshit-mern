import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import catchAsync from "../utils/catchAsync";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res
      .status(400)
      .json({ success: false, error: "Product image is required" });
  }

  const imageUrl = await ProductService.uploadImage(file);
  const result = await ProductService.createProduct(req.body, imageUrl);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();
  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await ProductService.getProductById(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const file = req.file;
  let imageUrl;

  if (file) {
    imageUrl = await ProductService.uploadImage(file);
  }

  const result = await ProductService.updateProduct(id, req.body, imageUrl);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ProductService.deleteProduct(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
