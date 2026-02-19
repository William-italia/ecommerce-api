import {
  CartItemDTO,
  CreateCartItemDTO,
  UpdateCartItemDTO,
} from './cart.types';

export interface ICartItemRepository {
  createItem(data: CreateCartItemDTO): Promise<CreateCartItemDTO>;
  findCartItemByID(
    productId: number,
    cartId: number
  ): Promise<CartItemDTO | null>;
  updateCartItemQuantity(
    itemId: number,
    data: UpdateCartItemDTO
  ): Promise<CartItemDTO | null>;
  findItemsByCartId(cartId: number): Promise<CartItemDTO[] | null>;
}
