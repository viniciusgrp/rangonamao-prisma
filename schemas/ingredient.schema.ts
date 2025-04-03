import { z } from 'zod';

export const createIngredientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().positive('Preço deve ser positivo'),
  storeId: z.string(),
});

export const ingredientResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  storeId: z.string(),
});
export const ingredientsResponseSchema = z.array(ingredientResponseSchema);

export type CreateIngredientInput = z.infer<typeof createIngredientSchema>;
export type IngredientResponse = z.infer<typeof ingredientResponseSchema>;
export type IngredientsResponse = z.infer<typeof ingredientsResponseSchema>;
