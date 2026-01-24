import pkg from 'pg';
const { Pool } = pkg;
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce-api',
  password: '123456',
  port: 5432,
});
