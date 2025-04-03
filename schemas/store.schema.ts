import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  url: z
    .string()
    .min(3, 'URL deve ter no mínimo 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  logo: z.string().url('URL do logo inválida').optional(),
  phone: z.string().optional(),
  color: z.string().optional(),
  background: z.string().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().min(8, 'CEP inválido').max(8, 'CEP inválido'),
});

export const updateStoreSchema = createStoreSchema.partial();

export const storeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  url: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens'),
  description: z.string(),
  logo: z.string().url().optional(),
  phone: z.string().optional(),
  color: z.string().optional(),
  background: z.string().nullable().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export const storesResponseSchema = z.array(storeResponseSchema);

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type StoreResponse = z.infer<typeof storeResponseSchema>;
export type StoresResponse = z.infer<typeof storesResponseSchema>;
