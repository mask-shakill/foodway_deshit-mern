export interface Category {
  id?: string;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  image?: Express.Multer.File;
}
