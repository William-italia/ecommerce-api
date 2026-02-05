import { z } from 'zod';

// params
export const querySchema = z.object({
  exclude: z.coerce.number().int().positive(),
  limit: z.coerce.number().int().positive().default(3),
});

export const productIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const productCategoryParamSchema = z.object({
  category: z.coerce.string(),
});

export const BoxItemSchema = z.object({
  quantidade: z.number().int().positive(),
  item: z.string().min(1),
});

// export type BoxItemDTO = z.infer<typeof BoxItemSchema>;

export const productResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(3),
  description: z.string().min(3),
  features: z.array(z.string()),
  box_items: z.array(BoxItemSchema).min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().positive(),
  main_image: z.string(),
  gallery_images: z.array(z.string()),
  category: z.string(),
});

export type ProductDTO = z.infer<typeof productResponseSchema>;

// body
export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  features: z.array(z.string()),
  box_items: z.array(BoxItemSchema).min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().positive(),
  main_image: z.string(),
  gallery_images: z.array(z.string()),
  category: z.string(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

// update
export const updateProductSchema = createProductSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualizar',
  });

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
