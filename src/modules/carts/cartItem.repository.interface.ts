import {
  CreateCartItemBodyDTO,
  CartItemResponseDTO,
  CreateCartItemRepoDTO,
  UpdateCartItemRepoDTO,
} from './cart.types';

export interface ICartItemRepository {
  createItem(data: CreateCartItemRepoDTO): Promise<CartItemResponseDTO>;
  findCartItemByID(
    productId: number,
    cartId: number
  ): Promise<CartItemResponseDTO | null>;
  updateCartItemQuantity(
    itemId: number,
    quantity: number
  ): Promise<CartItemResponseDTO | null>;
  findItemsByCartId(cartId: number): Promise<CartItemResponseDTO[] | null>;
  deleteItemsAll(cartId: number): Promise<boolean>;
  deleteById(itemId: number): Promise<CartItemResponseDTO | null>;
  getSubtotal(cartId: number): Promise<number>;
}
