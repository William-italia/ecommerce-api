import { z } from 'zod';
import {
  productResponseSchema,
  createProductSchema,
  updateProductSchema,
  RecommendedProductResponseSchema,
  CategoryProductResponseSchema,
} from './product.schema';

export type ProductDTO = z.infer<typeof productResponseSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type RecommendedProductDTO = z.infer<
  typeof RecommendedProductResponseSchema
>;

export type CategoryProductDTO = z.infer<typeof CategoryProductResponseSchema>;
