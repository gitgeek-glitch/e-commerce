const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  create: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const { rows } = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
      );
      console.log('User created:', rows[0]);
      return rows[0];
    } catch (error) {
      console.error('Error creating user:', error); // Log the error
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  authenticate: async (email, password) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  getById: async (id) => {
    const { rows } = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    return rows[0];
  },
};

module.exports = User;