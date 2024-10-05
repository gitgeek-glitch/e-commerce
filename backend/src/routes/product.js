const express = require('express');
const Product = require('../models/product');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
});

module.exports = router;