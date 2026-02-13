import { Request, Response } from 'express';
import { ProductService } from './product.service';
import {
  productIdParamSchema,
  productCategoryParamSchema,
  createProductSchema,
  updateProductSchema,
  recommendQuerySchema,
  productResponseSchema,
  recommendedProductResponseSchema,
  categoryProductResponseSchema,
} from './product.schema';
import { sendResponse } from '../../shared/utils/sendResponse';
import { handleError } from '../../shared/errors/handleError';

export class ProductController {
  constructor(private service: ProductService) {}

  getProducts = async (req: Request, res: Response) => {
    try {
      const data = await this.service.listProducts();

      return sendResponse(res, productResponseSchema.array(), data);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const data = await this.service.getProductById(id);

      return sendResponse(res, productResponseSchema, data);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  getRecommendedProducts = async (req: Request, res: Response) => {
    try {
      const { currentProductId, limit } = recommendQuerySchema.parse(req.query);

      const data = await this.service.getRecommendedProducts(
        currentProductId,
        limit
      );

      return sendResponse(res, recommendedProductResponseSchema.array(), data);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = productCategoryParamSchema.parse(req.params);

      const data = await this.service.getProductsByCategory(category);

      return sendResponse(res, categoryProductResponseSchema.array(), data);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const data = createProductSchema.parse(req.body);
      const product = await this.service.createProduct(data);

      return sendResponse(res, productResponseSchema, product, 201);
    } catch (error) {
      return handleError(res, error);
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const data = updateProductSchema.parse(req.body);

      const product = await this.service.updateProduct(id, data);

      return sendResponse(res, productResponseSchema, product);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };

  removeProduct = async (req: Request, res: Response) => {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const data = await this.service.deleteProduct(id);

      return sendResponse(res, productResponseSchema, data, 204);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  };
}
