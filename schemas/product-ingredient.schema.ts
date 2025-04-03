import { z } from 'zod';

export const createProductIngredientSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  ingredientId: z.string().min(1, 'Ingredient ID is required'),
});

export const productIngredientResponseSchema = z.object({
  id: z.string(),
  productId: z.string(),
  ingredientId: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    categoryId: z.string(),
    image: z.string().nullable(),
  }),
  ingredient: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  }),
});

export const productIngredientsResponseSchema = z.array(productIngredientResponseSchema);

export type CreateProductIngredientInput = z.infer<typeof createProductIngredientSchema>;
export type ProductIngredientResponse = z.infer<typeof productIngredientResponseSchema>;
export type ProductIngredientsResponse = z.infer<typeof productIngredientsResponseSchema>;
