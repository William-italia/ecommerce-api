import { z } from 'zod';

//PARAMS
export const cartTokenParamSchema = z.object({
  token: z.string(),
});

// CART
export const createCartBodySchema = z.object({
  cart_token: z.string(),
});

export const cartResponseSchema = z.object({
  id: z.number().int().positive(),
  token: z.uuid(),
});

export const createCartItemBodySchema = z.object({
  product_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().min(1),
});

export const cartItemResponseSchema = z.object({
  id: z.number().int().positive(),
  cart_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
  quantity: z.number().int().positive(),
  unit_price: z.number().positive(),
});
