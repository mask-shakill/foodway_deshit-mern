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
