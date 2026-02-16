import { pool } from '../../config/db';
import { CartDTO } from './cart.types';

export class CartRepository {
  async findAll(): Promise<CartDTO[]> {
    const carts = await pool.query(
      'SELECT id, token, created_at, updated_at FROM carts'
    );

    return carts.rows;
  }

  async findByToken(token: string): Promise<CartDTO | null> {
    const cartId = await pool.query('SELECT id FROM cart WHERE token = $1', [
      token,
    ]);

    if (cartId.rowCount === 0) return null;

    return cartId.rows[0];
  }
}
