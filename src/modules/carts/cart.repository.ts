import { pool } from '../../config/db';
import { CartResponseDTO, CreateCartBodyDTO } from './cart.types';

import { ICartRepository } from './cart.repository.interface';

export class CartRepository implements ICartRepository {
  async findCarts(): Promise<CartResponseDTO[]> {
    const carts = await pool.query(
      'SELECT id, token, created_at, updated_at FROM carts '
    );

    return carts.rows;
  }

  async findByToken(token: string): Promise<CartResponseDTO | null> {
    const cartId = await pool.query('SELECT * FROM carts WHERE token = $1 ', [
      token,
    ]);

    if (cartId.rowCount === 0) return null;

    return cartId.rows[0];
  }

  async createCart(data: CreateCartBodyDTO): Promise<CartResponseDTO> {
    const cart = await pool.query(
      'INSERT INTO carts(token) VALUES ($1) RETURNING *',
      [data.cart_token]
    );

    return cart.rows[0];
  }

  async deleteCart(token: string): Promise<CartResponseDTO | null> {
    const deleteCart = await pool.query(
      'DELETE FROM carts WHERE  token=$1 RETURNING *',
      [token]
    );

    if (deleteCart.rowCount === 0) return null;

    return deleteCart.rows[0];
  }
}
