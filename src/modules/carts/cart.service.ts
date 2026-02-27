import { ICartItemRepository } from './cartItem.repository.interface';
import { ICartRepository } from './cart.repository.interface';

import {
  CreateCartItemBodyDTO,
  CartItemResponseDTO,
  CreateCartItemRepoDTO,
  UpdateCartItemRepoDTO,
  CreateCartBodyDTO,
  CartResponseDTO,
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

  createCart = async (): Promise<CartResponseDTO> => {
    const token = randomUUID();
    const cart = await this.cartRepo.createCart({ cart_token: token });

    return {
      ...cart,
      id: cart.id,
      token: cart.token,
    };
  };

  getCart = async (token: string): Promise<any> => {
    const cart = await this.cartRepo.findByToken(token);

    if (!cart) throw AppError.notFound('Carrinho Não Foi Encontrado!');

    const items = (await this.cartItemRepo.findItemsByCartId(cart.id)) || [];
    const subtotal = (await this.cartItemRepo.getSubtotal(cart.id)) || 0;
    const IVA = Number(subtotal.toFixed(2)) * 0.2;
    const frete = subtotal > 0 ? 50 : 0;

    return {
      items: items,
      subtotal,
      IVA,
      frete,
    };
  };

  addCart = async (
    data: CreateCartItemBodyDTO,
    token?: string
  ): Promise<{ item: CartItemResponseDTO; newToken?: string }> => {
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
      data.product_id,
      cart.id
    );

    console.log(existed);

    if (existed) {
      const update = await this.cartItemRepo.updateCartItemQuantity(
        existed.id,
        data.quantity
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
  };
}
