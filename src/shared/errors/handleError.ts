import { Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from './AppError';

export function handleError(res: Response, error: any) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados Inválidos',
      errors: error.issues,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    message: 'Erro interno do servidor',
  });
}
