import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  slug: Joi.string().lowercase().required(),
  description: Joi.string().allow(""),
  price: Joi.number().positive().required(),
  category_id: Joi.string().uuid().required(),
  stock_quantity: Joi.number().integer().min(0).default(0),
  is_available: Joi.boolean().default(true),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  slug: Joi.string().lowercase(),
  description: Joi.string().allow(""),
  price: Joi.number().positive(),
  category_id: Joi.string().uuid(),
  stock_quantity: Joi.number().integer().min(0),
  is_available: Joi.boolean(),
});
