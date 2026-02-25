import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import catchAsync from "../utils/catchAsync";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { name, slug } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const imageUrl = await CategoryService.uploadImage(file);
    const result = await CategoryService.createCategory(
      { name, slug },
      imageUrl,
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  },
);

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const result = await CategoryService.getCategoryById(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const file = req.file;
    let imageUrl;

    if (file) {
      imageUrl = await CategoryService.uploadImage(file);
    }

    const result = await CategoryService.updateCategory(id, req.body, imageUrl);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  },
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await CategoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  },
);
