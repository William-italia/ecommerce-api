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
import { randomUUID } from 'node:crypto';
import { IProductRepository } from '../products/product.repository.interface';

export class CartService {
  constructor(
    private cartRepo: ICartRepository,
    private cartItemRepo: ICartItemRepository,
    private productRepo: IProductRepository
  ) {}

  async getCartWithItems(token: string): Promise<CartItemDTO[] | null> {
    const cartId = await this.cartRepo.findByToken(token);

    if (!cartId) throw AppError.notFound('Carrinho não encontrado!');

    const items = await this.cartItemRepo.findItemsByCartId(cartId.id);

    if (!items)
      throw AppError.notFound('Nenhum item encontrado nesse carrinho');

    return items;
  }

  async addCart(
    data: CreateCartItemDTO,
    token?: string
  ): Promise<{ item: CreateCartItemDTO; newToken?: string }> {
    let cart = null;
    let newToken: string | undefined;

    if (token) {
      cart = await this.cartRepo.findByToken(token);
    }

    if (!cart) {
      newToken = randomUUID();
      cart = await this.cartRepo.createCart({ cart_token: newToken });
    }

    const product = await this.productRepo.findById(data.product_id);
    if (!product) throw AppError.notFound('Produto não existe!');

    const existed = await this.cartItemRepo.findCartItemByID(
      cart.id,
      data.product_id
    );

    if (existed) {
      const quantity = existed.quantity + data.quantity;

      if (!existed.id)
        throw AppError.notFound('Não achamos nenhum item existente');

      const update = await this.cartItemRepo.updateCartItemQuantity(
        existed.id,
        { quantity }
      );

      if (!update) throw AppError.notFound('Erro ao atualizar item');

      return { item: update };
    }

    const item = await this.cartItemRepo.createItem({
      cart_id: cart.id,
      product_id: data.product_id,
      quantity: data.quantity,
      unit_price: product.price,
    });

    return { item, newToken };
  }

  // lista produtos do carrinho + total que dá o carrinho
  // remove produto do carrinho (no caso com quantity se for < 1 é pra remover do carrinhop)
  // remove all (apaga todos os items do carrinho porem o cart em si continua existindo entt nn precisa de um token novo)
}
