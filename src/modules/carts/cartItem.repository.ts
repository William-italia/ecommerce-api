import { pool } from '../../config/db';
import {
  CartDTO,
  CartItemDTO,
  CreateCartItemDTO,
  UpdateCartItemDTO,
} from './cart.types';

export class CartItemRepository {
  async createItem(data: CreateCartItemDTO): Promise<CreateCartItemDTO> {
    const result = await pool.query(
      'INSERT INTO cart_items(cart_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.cart_id, data.product_id, data.quantity, data.unit_price]
    );

    return result.rows[0];
  }

  async findCartItemByID(
    productId: number,
    cartId: number
  ): Promise<CartItemDTO | null> {
    const item = await pool.query(
      `SELECT id, cart_id, product_id, quantity, unit_price
   FROM cart_items
   WHERE cart_id = $1 AND product_id = $2`,
      [cartId, productId]
    );

    if (item.rowCount === 0) return null;

    return item.rows[0];
  }

  async updateCartItemQuantity(
    itemId: number,
    data: UpdateCartItemDTO
  ): Promise<CartItemDTO | null> {
    const update = await pool.query(
      "UPDATE cart_items CI SET quantity=$1  FROM carts C WHERE CI.id = $2 AND CI.cart_id = C.id AND C.token = $3 AND c.status = 'active' RETURNING CI.*",
      [data.quantity, itemId]
    );

    if (update.rowCount === 0) return null;

    return update.rows[0];
  }

  // pega a tabela com items do carrinho especifico
  async findItemsByCartId(cartId: number): Promise<CartItemDTO[] | null> {
    const Items = await pool.query(
      'SELECT ci.id, ci.product_id, ci.quantity, ci.unit_price, p.name, p.main_image FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = $1',
      [cartId]
    );

    if (Items.rowCount === 0) return null;

    return Items.rows;
  }
}
