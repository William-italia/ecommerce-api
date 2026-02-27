import { z } from 'zod';

import {
  createCartItemBodySchema,
  cartItemResponseSchema,
  createCartBodySchema,
  cartResponseSchema,
} from './cart.schema';

export type CreateCartBodyDTO = z.infer<typeof createCartBodySchema>;

export type CartResponseDTO = z.infer<typeof cartResponseSchema>;

export type CreateCartItemBodyDTO = z.infer<typeof createCartItemBodySchema>;

export type CartItemResponseDTO = z.infer<typeof cartItemResponseSchema>;

export type CreateCartItemRepoDTO = {
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
};

export type UpdateCartItemRepoDTO = {
  quantity: number;
};

export type CartItemWithProductRow = {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product_id_ref: number;
  name: string;
  main_image: string;
};

export type CartItemWithProductDTO = {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product: {
    id: number;
    name: string;
    main_image: string;
  };
};
