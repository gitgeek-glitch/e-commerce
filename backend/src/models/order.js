const pool = require('../config/database');

const Order = {
  create: async (userId, products) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id',
        [userId, 'pending']
      );
      const orderId = orderResult.rows[0].id;

      const orderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)';
      for (let product of products) {
        await client.query(orderItemsQuery, [orderId, product.id, product.quantity]);
      }

      await client.query('COMMIT');
      return orderId;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  getStatus: async (id, userId) => {
    const { rows } = await pool.query(
      'SELECT status FROM orders WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rows[0];
  },

  getUserOrders: async (userId) => {
    const { rows } = await pool.query(
      'SELECT o.*, oi.product_id, oi.quantity, p.name, p.price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.user_id = $1',
      [userId]
    );
    return rows;
  },
};

module.exports = Order;