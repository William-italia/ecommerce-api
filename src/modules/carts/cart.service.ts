import { ICartItemRepository } from "./cartItem.repository.interface";
import { ICartRepository } from "./cart.repository.interface";

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
} from "./cart.types";

import { AppError } from "../../shared/errors/AppError";
import { randomUUID } from "node:crypto";
import { IProductRepository } from "../products/product.repository.interface";

export class CartService {
  constructor(
    private cartRepo: ICartRepository,
    private cartItemRepo: ICartItemRepository,
    private productRepo: IProductRepository,
  ) {}

  async listCarts(): Promise<CartDTO[]> {
    return this.cartRepo.findAll();
  }

  async addCart(data: CreateCartItemDTO, token: string): Promise<CartItemDTO> {
    let cart = await this.cartRepo.findByToken(token);

    if (!cart) {
      const newToken = randomUUID();
      cart = await this.cartRepo.createCart({ cart_token: newToken });
    }

    const product = await this.productRepo.findById(data.product_id);

    if (!product) throw AppError.notFound("Produto não existe!");

    const item = await this.cartItemRepo.createItem({
      cart_id: cart.id,
      product_id: product.id,
      quantity: data.quantity,
      unit_price: product.price,
    });

    return item;
  }
}
