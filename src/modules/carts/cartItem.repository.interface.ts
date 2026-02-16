import {
  CartItemDTO,
  CreateCartItemDTO,
  UpdateCartItemDTO,
} from './cart.types';

export interface ICartItemRepository {
  createItem(data: CreateCartItemDTO): Promise<CreateCartItemDTO>;
  findItemByID(productId: number): Promise<CartItemDTO | null>;
  updateCartItemQuantity(
    itemId: number,
    data: UpdateCartItemDTO
  ): Promise<CartItemDTO | null>;
}
