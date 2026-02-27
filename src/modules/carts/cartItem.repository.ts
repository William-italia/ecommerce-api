import { pool } from '../../config/db';
import { CartItemResponseDTO, CreateCartItemRepoDTO } from './cart.types';

import { ICartItemRepository } from './cartItem.repository.interface';

export class CartItemRepository implements ICartItemRepository {
  async createItem(data: CreateCartItemRepoDTO): Promise<CartItemResponseDTO> {
    const result = await pool.query(
      'INSERT INTO cart_items(cart_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.cart_id, data.product_id, data.quantity, data.unit_price]
    );

    return result.rows[0];
  }

  async findCartItemByID(
    productId: number,
    cartId: number
  ): Promise<CartItemResponseDTO | null> {
    const item = await pool.query(
      `SELECT *
   FROM cart_items
   WHERE cart_id = $1 AND product_id = $2 `,
      [cartId, productId]
    );

    if (item.rowCount === 0) return null;

    return item.rows[0];
  }

  async updateCartItemQuantity(
    cartItemId: number,
    quantity: number
  ): Promise<CartItemResponseDTO | null> {
    const update = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, cartItemId]
    );

    if (update.rowCount === 0) return null;

    return update.rows[0];
  }

  async findItemsByCartId(
    cartId: number
  ): Promise<CartItemResponseDTO[] | null> {
    const Items = await pool.query(
      'SELECT ci.id as cart_item_id, ci.product_id, ci.quantity, ci.unit_price, p.id as product_id_ref, p.name, p.main_image FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = $1 ',
      [cartId]
    );

    return Items.rows;
  }

  async deleteItemsAll(cartId: number): Promise<boolean> {
    const { rowCount } = await pool.query(
      'DELETE FROM cart_items WHERE cart_id = $1',
      [cartId]
    );

    return (rowCount ?? 0) > 0;
  }

  async deleteById(itemId: number): Promise<CartItemResponseDTO | null> {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE id=$1 RETURNING *',
      [itemId]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  async getSubtotal(cartId: number): Promise<number> {
    const result = await pool.query(
      'SELECT SUM(unit_price * quantity) AS total FROM cart_items WHERE cart_id = $1;',
      [cartId]
    );
    const total = Number(result.rows[0].total ?? 0);

    return total;
  }
}
