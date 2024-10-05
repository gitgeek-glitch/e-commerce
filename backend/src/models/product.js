const pool = require('../config/database');

const Product = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  },

  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  },

  create: async (product) => {
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [product.name, product.description, product.price, product.image_url]
    );
    return rows[0];
  },

  update: async (id, product) => {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [product.name, product.description, product.price, product.image_url, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  },
};

module.exports = Product;