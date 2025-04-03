import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  error: string;
  details?: ValidationError[];
}

export interface ZodErrorResponse {
  error: string;
  details: ValidationError[];
}
