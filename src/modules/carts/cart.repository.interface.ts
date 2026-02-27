import {
  CreateCartItemBodyDTO,
  CartItemResponseDTO,
  CreateCartItemRepoDTO,
  UpdateCartItemRepoDTO,
  CartResponseDTO,
  CreateCartBodyDTO,
} from './cart.types';

export interface ICartRepository {
  findCarts(): Promise<CartResponseDTO[]>;
  deleteCart(token: string): Promise<CartResponseDTO | null>;
  createCart(data: CreateCartBodyDTO): Promise<CartResponseDTO>;
  findByToken(token: string): Promise<CartResponseDTO | null>;
}
