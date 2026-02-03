import { Request, Response, NextFunction } from 'express';
import { ProductRepository } from '../product.repository';
import { AppError } from '../../../shared/errors/AppError';
const repo = new ProductRepository();

export const productExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Validando Id');

  const id = Number(req.params.id);

  if (!id) throw new AppError('Id inválido', 400);
  const product = await repo.getById(id);

  console.log('Buscando Produto');

  if (!product) throw new AppError('Produto não existe', 404);

  console.log('Produto: ', product);
  (req as any).product = product;

  next();
};
