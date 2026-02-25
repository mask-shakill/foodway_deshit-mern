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

    const { error } = await supabase.storage
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

  async getCategoryById(id: string) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Category not found");
    return data;
  },

  async updateCategory(
    id: string,
    updateData: Partial<CreateCategoryInput>,
    imageUrl?: string,
  ) {
    const payload: any = { ...updateData };
    if (imageUrl) payload.image_url = imageUrl;

    const { data, error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(id: string) {
    const { data: category } = await supabase
      .from("categories")
      .select("image_url")
      .eq("id", id)
      .single();

    if (category?.image_url) {
      const fileName = category.image_url.split("/").pop() || "";
      if (fileName) {
        await supabase.storage
          .from("category_image")
          .remove([`category_images/${fileName}`]);
      }
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
