import { supabase } from "../config/database";
import { Product, CreateProductInput } from "../interfaces/product.interface";
import { v4 as uuidv4 } from "uuid";

export const ProductService = {
  async uploadImage(file: any): Promise<string> {
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `product_images/${fileName}`;

    const { error } = await supabase.storage
      .from("product_images")
      .upload(filePath, file.buffer, { contentType: file.mimetype });

    if (error) throw new Error("Upload failed: " + error.message);

    const { data } = supabase.storage
      .from("product_images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  },

  async createProduct(
    data: CreateProductInput,
    imageUrl: string,
  ): Promise<Product> {
    const { data: product, error } = await supabase
      .from("products")
      .insert([{ ...data, image_url: imageUrl }])
      .select()
      .single();

    if (error) throw error;
    return product;
  },

  async getAllProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("id", id)
      .single();

    if (error) throw new Error("Product not found");
    return data;
  },

  async updateProduct(
    id: string,
    updateData: Partial<CreateProductInput>,
    imageUrl?: string,
  ) {
    const payload: any = { ...updateData };
    if (imageUrl) payload.image_url = imageUrl;

    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string) {
    const { data: product } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    if (product?.image_url) {
      const fileName = product.image_url.split("/").pop() || "";
      if (fileName) {
        await supabase.storage
          .from("product_images")
          .remove([`product_images/${fileName}`]);
      }
    }

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
