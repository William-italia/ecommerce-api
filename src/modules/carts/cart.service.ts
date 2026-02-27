import { ICartItemRepository } from './cartItem.repository.interface';
import { ICartRepository } from './cart.repository.interface';

import {
  CreateCartItemBodyDTO,
  CartItemResponseDTO,
  CreateCartItemRepoDTO,
  CreateCartBodyDTO,
  CartResponseDTO,
  CartDetailsDTO,
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

  getCart = async (token: string): Promise<CartDetailsDTO> => {
    const cart = await this.cartRepo.findByToken(token);

    if (!cart) throw AppError.notFound('Carrinho Não Foi Encontrado!');

    const items = (await this.cartItemRepo.findItemsByCartId(cart.id)) || [];
    const subtotal = (await this.cartItemRepo.getSubtotal(cart.id)) || 0;
    const IVA = subtotal * 0.2;
    const frete = subtotal > 0 ? 50 : 0;

    const totalItems = items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    return {
      items: items,
      totalItems,
      subtotal,
      IVA,
      frete,
    };
  };

  addCart = async (
    data: CreateCartItemBodyDTO,
    token?: string | null
  ): Promise<{ item: CartItemResponseDTO; newToken?: string }> => {
    const { Cart, newToken } = await this.createIfNotExists(token);

    const product = await this.validateProduct(data.product_id);

    const existed = await this.cartItemRepo.findCartItemByID(
      data.product_id,
      Cart.id
    );

    if (existed) {
      if (data.quantity <= 0) {
        return await this.removeItemIfZero(existed.id);
      }

      if (data.quantity > 0) {
        return await this.updateExistingItem(existed.id, data.quantity);
      }
    }

    const item = await this.cartItemRepo.createItem({
      cart_id: Cart.id,
      product_id: data.product_id,
      quantity: data.quantity,
      unit_price: product.price,
    });

    return { item, newToken };
  };

  private async createIfNotExists(token?: string | null) {
    let Cart = null;
    let newToken: string | undefined;

    if (token) {
      Cart = await this.cartRepo.findByToken(token);
    }

    if (!Cart) {
      newToken = randomUUID();
      Cart = await this.cartRepo.createCart({ cart_token: newToken });
    }

    return { Cart, newToken };
  }

  private async validateProduct(productId: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) throw AppError.notFound('Produto não existe!');

    return product;
  }

  private async removeItemIfZero(existedId: number) {
    const deleted = await this.cartItemRepo.deleteById(existedId);

    if (!deleted) throw AppError.notFound('Produto não foi encontrado!');

    return { item: deleted };
  }

  private async updateExistingItem(existedId: number, quantity: number) {
    const update = await this.cartItemRepo.updateCartItemQuantity(
      existedId,
      quantity
    );

    if (!update) throw AppError.notFound('Produto não foi encontrado!');

    return { item: update };
  }
}
