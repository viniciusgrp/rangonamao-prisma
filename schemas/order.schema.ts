import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string(),
  storeId: z.string(),
  products: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().positive('Quantidade deve ser positiva'),
      })
    )
    .min(1, 'O pedido deve ter pelo menos um produto'),
});

export const orderResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  storeId: z.string(),
  user: z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
  }),
  store: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    url: z.string(),
    description: z.string(),
    logo: z.string().nullable(),
    phone: z.string().nullable(),
    color: z.string().nullable(),
    background: z.string().nullable(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  products: z.array(
    z.object({
      id: z.string(),
      orderId: z.string(),
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
      product: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        categoryId: z.string(),
        image: z.string().nullable(),
      }),
    })
  ),
});

export const ordersResponseSchema = z.array(orderResponseSchema);

// Tipos inferidos dos schemas
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderResponse = z.infer<typeof orderResponseSchema>;
export type OrdersResponse = z.infer<typeof ordersResponseSchema>;
