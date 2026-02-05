import { pool } from '../../config/db';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './product.schema';

export class ProductRepository {
  async getAll(): Promise<ProductDTO[]> {
    const result = await pool.query('SELECT * FROM products');
    return result.rows as ProductDTO[];
  }

  async getById(id: number): Promise<ProductDTO | null> {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rowCount === 0) return null;

    return result.rows[0] as ProductDTO;
  }

  async getByName(name: string): Promise<ProductDTO | null> {
    const result = await pool.query('SELECT * FROM products WHERE name = $1', [
      name,
    ]);

    if (result.rowCount === 0) return null;
    return result.rows[0] as ProductDTO;
  }

  async getByCategory(category: string): Promise<ProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name, description, main_image FROM products WHERE category = $1',
      [category]
    );

    if (result.rowCount === 0) return [];

    return result.rows as ProductDTO[];
  }

  async getRecommended(exclude: number, limit: number): Promise<ProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name FROM products WHERE id != $1 ORDER BY RANDOM() LIMIT $2',
      [exclude, limit]
    );

    if (result.rowCount === 0) return [];

    return result.rows as ProductDTO[];
  }

  async create(data: CreateProductDTO): Promise<ProductDTO> {
    const result = await pool.query(
      'INSERT INTO products(name, description, features, box_items, price, stock, main_image, gallery_images, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        data.name,
        data.description,
        JSON.stringify(data.features),
        JSON.stringify(data.box_items),
        data.price,
        data.stock,
        data.main_image,
        JSON.stringify(data.gallery_images),
        data.category,
      ]
    );
    return result.rows[0] as ProductDTO;
  }

  async updateById(
    id: number,
    data: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

    let idx = 1;

    if (data.name !== undefined) {
      fields.push(`name=$${idx++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description=$${idx++}`);
      values.push(data.description);
    }
    if (data.features !== undefined) {
      fields.push(`features=$${idx++}`);
      values.push(JSON.stringify(data.features));
    }
    if (data.box_items !== undefined) {
      fields.push(`box_items=$${idx++}`);
      values.push(JSON.stringify(data.box_items));
    }
    if (data.price !== undefined) {
      fields.push(`price=$${idx++}`);
      values.push(data.price);
    }
    if (data.stock !== undefined) {
      fields.push(`stock=$${idx++}`);
      values.push(data.stock);
    }
    if (data.main_image !== undefined) {
      fields.push(`main_image=$${idx++}`);
      values.push(data.main_image);
    }
    if (data.gallery_images !== undefined) {
      fields.push(`gallery_images=$${idx++}`);
      values.push(JSON.stringify(data.gallery_images));
    }
    if (data.category !== undefined) {
      fields.push(`category=$${idx++}`);
      values.push(data.category);
    }

    if (fields.length === 0) return null;

    const query = `
      UPDATE products
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *
    `;
    values.push(id);
    const result = await pool.query(query, values);

    if (result.rowCount === 0) return null;

    return result.rows[0] as ProductDTO;
  }

  async deleteById(id: number): Promise<ProductDTO | null> {
    const result = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0] as ProductDTO;
  }
}
