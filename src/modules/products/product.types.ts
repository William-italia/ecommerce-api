import { z } from 'zod';
import {
  productResponseSchema,
  createProductSchema,
  updateProductSchema,
  recommendedProductResponseSchema,
  categoryProductResponseSchema,
} from './product.schema';

export type ProductDTO = z.infer<typeof productResponseSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type RecommendedProductDTO = z.infer<
  typeof recommendedProductResponseSchema
>;
export type CategoryProductDTO = z.infer<typeof categoryProductResponseSchema>;
