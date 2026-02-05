import { z } from 'zod';
import {
  productResponseSchema,
  createProductSchema,
  updateProductSchema,
} from './product.schema';

export type ProductDTO = z.infer<typeof productResponseSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
