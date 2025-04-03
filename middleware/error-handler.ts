import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message || 'Internal server error',
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
};
