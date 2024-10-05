const pool = require('../config/database');

const Cart = {
  getUserCart: async (userId) => {
    const result = await pool.query(
      'SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = $1',
      [userId]
    );
    return result.rows;
  },

  addItem: async (userId, productId, quantity) => {
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id, product_id) 
       DO UPDATE SET quantity = cart_items.quantity + $3
       RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0];
  },

  removeItem: async (userId, productId) => {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );
    return result.rows[0];
  },

  clearCart: async (userId) => {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 RETURNING *',
      [userId]
    );
    return result.rows;
  },

  updateQuantity: async (userId, productId, quantity) => {
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId, quantity]
    );
    return result.rows[0];
  },
};

module.exports = Cart;