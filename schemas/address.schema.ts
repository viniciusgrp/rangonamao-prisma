import { z } from 'zod';

export const createAddressSchema = z.object({
  street: z.string().min(3, 'Rua deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'Número é obrigatório'),
  city: z.string().min(3, 'Cidade deve ter no mínimo 3 caracteres'),
  state: z.string().min(2, 'Estado deve ter 2 caracteres').max(2, 'Estado deve ter 2 caracteres'),
  zipCode: z.string().min(8, 'CEP inválido').max(8, 'CEP inválido'),
  userId: z.string(),
  observation: z.string().optional(),
});

export const addressResponseSchema = z.object({
  id: z.string(),
  street: z.string(),
  number: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  userId: z.string(),
  observation: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const addressesResponseSchema = z.array(addressResponseSchema);

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type AddressResponse = z.infer<typeof addressResponseSchema>;
export type AddressesResponse = z.infer<typeof addressesResponseSchema>;
