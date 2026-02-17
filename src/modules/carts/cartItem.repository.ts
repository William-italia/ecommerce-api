import { pool } from "../../config/db";
import {
  CartItemDTO,
  CreateCartItemDTO,
  UpdateCartItemDTO,
} from "./cart.types";

export class CartItemRepository {
  async createItem(data: CartItemDTO): Promise<CartItemDTO> {
    const result = await pool.query(
      "INSERT INTO cart_items(cart_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.cart_id, data.product_id, data.quantity, data.unit_price],
    );

    return result.rows[0];
  }

  async findItemByID(productId: number): Promise<CartItemDTO | null> {
    const item = await pool.query(
      "SELECT id, cart_id, product_id, quantity, unit_price  FROM cart_items WHERE product_id = $1",
      [productId],
    );

    if (item.rowCount === 0) return null;

    return item.rows[0];
  }

  async updateCartItemQuantity(
    itemId: number,
    data: UpdateCartItemDTO,
  ): Promise<CartItemDTO | null> {
    const update = await pool.query(
      "UPDATE cart_items CI SET quantity=$1  FROM carts C WHERE CI.id = $2 AND CI.cart_id = C.id AND C.token = $3 AND c.status = 'active' RETURNING CI.*",
      [data.quantity, itemId],
    );

    if (update.rowCount === 0) return null;

    return update.rows[0];
  }
}
