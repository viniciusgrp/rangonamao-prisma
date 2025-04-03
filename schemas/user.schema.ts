import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().min(11, 'CPF inválido').max(11, 'CPF inválido'),
});

export const updateUserSchema = createUserSchema.partial();

export const userResponseSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const usersResponseSchema = z.array(userResponseSchema);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
