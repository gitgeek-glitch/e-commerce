const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const sustainabilityRoutes = require('./routes/sustainability');  // New Route for Sustainability Tracker
const authenticateJWT = require('./middleware/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const pool = require('./config/database');

// Check database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully. Current time:', res.rows[0].now);
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', authenticateJWT, productRoutes);
app.use('/api/orders', authenticateJWT, orderRoutes);
app.use('/api/cart', authenticateJWT, cartRoutes);
app.use('/api/sustainability', authenticateJWT, sustainabilityRoutes);  // New Route for Sustainability Tracker

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
