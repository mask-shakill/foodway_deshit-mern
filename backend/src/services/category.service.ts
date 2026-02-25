import { supabase } from "../config/database";
import {
  Category,
  CreateCategoryInput,
} from "../interfaces/category.interface";
import { v4 as uuidv4 } from "uuid";

export const CategoryService = {
  async uploadImage(file: any): Promise<string> {
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `category_images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("category_image")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new Error("Image upload failed: " + error.message);
    const { data: publicUrlData } = supabase.storage
      .from("category_image")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  async createCategory(
    data: CreateCategoryInput,
    imageUrl: string,
  ): Promise<Category> {
    const { data: newCategory, error } = await supabase
      .from("categories")
      .insert([
        {
          name: data.name,
          slug: data.slug,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return newCategory;
  },

  async getAllCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
