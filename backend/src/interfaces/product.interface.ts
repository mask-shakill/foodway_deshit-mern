export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category_id: string;
  image_url: string;
  is_available: boolean;
  stock_quantity: number;
  created_at: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  category_id: string;
  stock_quantity?: number;
}
