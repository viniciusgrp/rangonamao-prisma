import { z } from 'zod';

const existingIngredientSchema = z.object({
  id: z.string(),
  quantity: z.number().positive('Quantidade deve ser positiva'),
});

const newIngredientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().positive('Preço deve ser positivo').optional(),
  quantity: z.number().positive('Quantidade deve ser positiva'),
});

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().positive('Preço deve ser positivo'),
  categoryId: z.string(),
  image: z.string().url('URL da imagem inválida').optional(),
  ingredients: z.array(z.union([existingIngredientSchema, newIngredientSchema])).optional(),
});

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.string(),
  image: z.string().nullable(),
  category: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    storeId: z.string(),
  }),
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

export const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
