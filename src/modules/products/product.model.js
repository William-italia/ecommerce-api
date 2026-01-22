import { pool } from '../../config/db';

const findAll = async () => {
  const result = await pool.query('SELECT * FROM products');

  return result.rows;
};

const findById = async id => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

  return result.rows[0];
};

const create = async data => {
  const result = await pool.query(
    'INSERT INTO products(name, description, features, boxItems, price, stock, main_image, galleryImages) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
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

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(
    'UPDATE products SET name=$1, description=$2, features=$3, boxItems=$4, price=$5, stock=$6, main_image=$7, galleryImages=$8 WHERE id=$9 RETURNING *',
    [
      data.name,
      data.description,
      data.features,
      JSON.stringify(data.boxItems),
      data.price,
      data.stock,
      data.mainImage,
      JSON.stringify(data.galleryImages),
      id,
    ]
  );

  if (result.rowCount === 0) return null;

  return result.rows[0];
};

const del = async id => {
  const result = await pool.query(
    'DELETE FROM products WHERE id=$1 RETURNING *',
    [id]
  );

  if (result.rowCount === 0) return null;

  return result.rows[0];
};

export default { findAll, findById, create, update, del };
