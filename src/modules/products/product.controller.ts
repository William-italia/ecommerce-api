import { Request, Response } from 'express';
import { Product, CreateProductDTO } from './product.types';
import { ProductService } from './product.service';

export class ProductController {
  async getAll(req: Request, res: Response) {}

  async getProduct(req: Request, res: Response) {}

  async createProduct(req: Request, res: Response) {}

  async updateProduct(req: Request, res: Response) {}

  async removeProduct(req: Request, res: Response) {}
}
