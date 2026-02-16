import { z } from "zod";

import {
  createCartSchema,
  createCartItemSchema,
  cartResponseSchema,
  cartItemResponseSchema,
  createOrderSchema,
  createOrderItemSchema,
  orderResponseSchema,
  updateCartItemSchema,
  orderItemResponse,
} from "./cart.schema";

export type CartDTO = z.infer<typeof cartResponseSchema>;
export type CreateCartDTO = z.infer<typeof createCartSchema>;

export type CartItemDTO = z.infer<typeof cartItemResponseSchema>;
export type CreateCartItemDTO = z.infer<typeof createCartItemSchema>;
export type UpdateCartItemDTO = z.infer<typeof updateCartItemSchema>;

export type OrderDTO = z.infer<typeof orderResponseSchema>;
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;

export type OrderItemDTO = z.infer<typeof orderItemResponse>;
export type CreateOrderItemDTO = z.infer<typeof createOrderItemSchema>;
