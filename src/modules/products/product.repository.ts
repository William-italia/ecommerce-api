import { pool } from '../../config/db';
import { z } from 'zod';

import {
  ProductDTO,
  RecommendedProductDTO,
  CategoryProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './product.types';

import {
  CategoryProductResponseSchema,
  productResponseSchema,
  RecommendedProductResponseSchema,
} from './product.schema';

import { ProductMapper } from './product.mapper';

export class ProductRepository {
  //
  async getAllProducts(): Promise<ProductDTO[]> {
    const result = await pool.query('SELECT * FROM products');

    return result.rows.map(row => productResponseSchema.parse(row));
  }
  //
  async getProductById(id: number): Promise<ProductDTO | null> {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rowCount === 0) return null;

    return productResponseSchema.parse(ProductMapper.toDTO(result.rows[0]));
  }

  async existsByName(name: string): Promise<boolean | null> {
    const result = await pool.query(
      'SELECT name FROM products WHERE name = $1',
      [name]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }

  async getProductsByCategory(category: string): Promise<CategoryProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name, description, main_image FROM products WHERE category = $1 ORDER BY position ASC',
      [category]
    );

    if (result.rowCount === 0) return [];

    return result.rows.map(row =>
      CategoryProductResponseSchema.parse(ProductMapper.toCategoryDTO(row))
    );
  }

  async getRecommendedProducts(
    exclude: number,
    limit: number
  ): Promise<RecommendedProductDTO[]> {
    const result = await pool.query(
      'SELECT id, name FROM products WHERE id != $1 ORDER BY RANDOM() LIMIT $2',
      [exclude, limit]
    );

    if (result.rowCount === 0) return [];

    return result.rows.map(row =>
      RecommendedProductResponseSchema.parse(ProductMapper.toCategoryDTO(row))
    );
  }

  async createProduct(data: CreateProductDTO): Promise<ProductDTO> {
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
    return productResponseSchema.parse(ProductMapper.toDTO(result.rows[0]));
  }

  async updateProductById(
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

    return productResponseSchema.parse(ProductMapper.toDTO(result.rows[0]));
  }

  async deleteProductById(id: number): Promise<ProductDTO | null> {
    const result = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) return null;

    return productResponseSchema.parse(ProductMapper.toDTO(result.rows[0]));
  }
}
