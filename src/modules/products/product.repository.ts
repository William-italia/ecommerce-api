import { json } from 'node:stream/consumers';
import { pool } from '../../config/db';
import { Product, CreateProductDTO, UpdateProductDTO } from './product.types';
import { parseProductJSON } from '../../shared/utils/parseProduct.utils';

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const result = await pool.query('SELECT * FROM products');
    return result.rows as Product[];
  }

  async getById(id: number): Promise<Product | null> {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rowCount === 0) return null;

    return parseProductJSON(result.rows[0] as Product);
  }
  async create(data: CreateProductDTO): Promise<Product> {
    const result = await pool.query(
      'INSERT INTO products(name, description, features, boxItems, price, stock, mainImage, galleryImages) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        data.name,
        data.description,
        data.features,
        JSON.stringify(data.boxItems),
        data.price,
        data.stock,
        data.mainImage,
        JSON.stringify(data.galleryImages),
      ]
    );
    return result.rows[0] as Product;
  }

  async updateById(
    id: number,
    data: UpdateProductDTO
  ): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];

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
      values.push(data.features);
    }
    if (data.boxItems !== undefined) {
      fields.push(`boxItems=$${idx++}`);
      values.push(JSON.stringify(data.boxItems));
    }
    if (data.price !== undefined) {
      fields.push(`price=$${idx++}`);
      values.push(data.price);
    }
    if (data.stock !== undefined) {
      fields.push(`stock=$${idx++}`);
      values.push(data.stock);
    }
    if (data.mainImage !== undefined) {
      fields.push(`mainImage=$${idx++}`);
      values.push(data.mainImage);
    }
    if (data.galleryImages !== undefined) {
      fields.push(`galleryImages=$${idx++}`);
      values.push(JSON.stringify(data.galleryImages));
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

    return parseProductJSON(result.rows[0] as Product);
  }

  async deleteById(id: number): Promise<Product | null> {
    const result = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0] as Product;
  }
}
