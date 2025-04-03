import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  storeId: z.string(),
});

const productWithIngredientsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.string(),
  image: z.string().nullable(),
  ingredients: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      ingredientId: z.string(),
      ingredient: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    })
  ),
});

export const categoryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  storeId: z.string(),
  products: z.array(productWithIngredientsSchema),
});

export const categoriesResponseSchema = z.array(categoryResponseSchema);

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
