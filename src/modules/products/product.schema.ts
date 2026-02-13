import { z } from 'zod';

// params
export const recommendQuerySchema = z.object({
  currentProductId: z.coerce.number().int().positive().default(0),
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
  item: z.string(),
});

export const productResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  box_items: z.array(BoxItemSchema),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().positive(),
  main_image: z.string(),
  gallery_images: z.array(z.string()),
  category: z.string(),
});

export const recommendedProductResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
});

export const categoryProductResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  description: z.string(),
  main_image: z.string(),
});

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
  position: z.coerce.number().int().positive(),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualizar',
  });
