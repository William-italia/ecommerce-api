import { z } from 'zod';

// params
export const productIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const BoxItemSchema = z.object({
  quantidade: z.number().int().positive(),
  item: z.string().min(1),
});

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

// update
export const updateProductSchema = createProductSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualizar',
  });
