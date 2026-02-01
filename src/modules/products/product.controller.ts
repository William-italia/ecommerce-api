import { Request, Response } from 'express';
import { ProductService } from './product.service';
import {
  productIdParamSchema,
  createProductSchema,
  updateProductSchema,
} from './product.schema';
import { handleError } from '../../shared/errors/handleError';

export class ProductController {
  constructor(private service: ProductService) {}

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.service.listProducts();

      res.status(200).json(products);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const product = await this.service.getProduct(id);

      return res.status(200).json(product);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const data = createProductSchema.parse(req.body);
      const product = await this.service.createProduct(data);

      return res.status(201).json(product);
    } catch (error) {
      return handleError(res, error);
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const data = updateProductSchema.parse(req.body);

      const product = await this.service.updateProduct(id, data);

      return res.status(200).json(product);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  removeProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const product = await this.service.removeProduct(id);

      return res
        .status(200)
        .json({ message: 'Produto excluido com sucesso', product });
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };
}
