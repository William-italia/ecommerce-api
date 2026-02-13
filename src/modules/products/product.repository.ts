import { pool } from '../../config/db';
import { z } from 'zod';

import {
  ProductDTO,
  RecommendedProductDTO,
  CategoryProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './product.types';

import { ProductMapper } from './product.mapper';

export class ProductRepository {
  //
  async findAll(): Promise<ProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name, description, features, box_items, price, stock, main_image, gallery_images, category, position FROM products'
    );

    return ProductMapper.toProductDTOList(result.rows);
  }
  //
  async findById(id: number): Promise<ProductDTO | null> {
    const result = await pool.query(
      'SELECT id, name, description, features, box_items, price, stock, main_image, gallery_images, category, position FROM products WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) return null;

    return ProductMapper.toProductDTO(result.rows[0]);
  }

  async findByCategory(category: string): Promise<CategoryProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name, description, main_image FROM products WHERE category = $1 ORDER BY position ASC',
      [category]
    );

    if (result.rowCount === 0) return [];

    return ProductMapper.toCategoryDTOList(result.rows);
  }

  async findRecommended(
    exclude: number,
    limit: number
  ): Promise<RecommendedProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name FROM products WHERE id != $1 ORDER BY position DESC LIMIT $2',
      [exclude, limit]
    );

    if (result.rowCount === 0) return [];

    return ProductMapper.toRecommendedDTOList(result.rows);
  }

  async create(data: CreateProductDTO): Promise<ProductDTO> {
    const result = await pool.query(
      'INSERT INTO products(name, description, features, box_items, price, stock, main_image, gallery_images, category, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
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
        data.position,
      ]
    );
    return ProductMapper.toProductDTO(result.rows[0]);
  }

  async update(id: number, data: UpdateProductDTO): Promise<ProductDTO | null> {
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

    if (data.position !== undefined) {
      fields.push(`position=$${idx++}`);
      values.push(data.position);
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

    return ProductMapper.toProductDTO(result.rows[0]);
  }

  async delete(id: number): Promise<ProductDTO | null> {
    const result = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) return null;

    return ProductMapper.toProductDTO(result.rows[0]);
  }

  async findByName(name: string): Promise<boolean> {
    const result = await pool.query(
      'SELECT name FROM products WHERE name = $1',
      [name]
    );

    return (result.rowCount as any) > 0;
  }

  async existsByName(name: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT name FROM products WHERE name = $1 AND id != $2';
    const values: (string | number)[] = [name];

    if (excludeId !== undefined) {
      query += ' AND id != $2';
      values.push(excludeId);
    }

    const result = await pool.query(query, values);

    return (result.rowCount as any) > 0;
  }
}
