import { positive, z } from 'zod';

//PARAMS

// CART

export const createCartSchema = z.object({
  cart_token: z.string(),
});

export const cartResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  cart_token: z.string(),
});

export const createCartItemSchema = z.object({
  cart_id: z.coerce.number().int().positive(),
  product_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().positive().min(0).max(8),
  unit_price: z.coerce.number().positive(),
});

export const cartItemResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  cart_id: z.coerce.number().int().positive(),
  product_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unit_price: z.coerce.number().positive(),
});

// ORDERS
export const createOrderSchema = z.object({
  customer_name: z.string(),
  customer_email: z.email(),
  customer_phone: z.coerce.number().min(11),
  amount: z.coerce.number().positive(),
  freight: z.coerce.number(),
  status: z.string(),
});

export const orderResponseSchema = z.object({
  id: z.coerce.number().int().positive(),
  customer_name: z.string(),
  customer_email: z.email(),
  customer_phone: z.coerce.number().min(11),
  amount: z.coerce.number().positive(),
  freight: z.coerce.number(),
  status: z.string(),
  created_at: z.date(),
});

export const createOrderItemSchema = z.object({
  order_id: z.coerce.number().int().positive(),
  product_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unit_price: z.coerce.number().positive(),
});

export const orderItemResponse = z.object({
  cart_id: z.coerce.number().int().positive(),
  product_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unit_price: z.coerce.number().positive(),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().min(0).max(8),
});
