import { ICartItemRepository } from './cartItem.repository.interface';
import { ICartRepository } from './cart.repository.interface';

import {
  CartDTO,
  CartItemDTO,
  OrderDTO,
  OrderItemDTO,
  CreateCartDTO,
  CreateCartItemDTO,
  UpdateCartItemDTO,
  CreateOrderDTO,
  CreateOrderItemDTO,
} from './cart.types';

import { AppError } from '../../shared/errors/AppError';

export class CartService {
  constructor(
    private cartRepo: ICartRepository,
    private cartItemRepo: ICartItemRepository
  ) {}

  async listCarts(): Promise<CartDTO[]> {
    return this.cartRepo.findAll();
  }

  async createCart(data: CreateCartDTO): Promise<CartDTO> {

    const item =


  }
}
