const express = require('express');
const Cart = require('../models/cart');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.addItem(req.user.id, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding item to cart' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const cartItems = await Cart.getUserCart(req.user.id);
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching cart items' });
  }
});

router.put('/:productId', authenticateJWT, async (req, res) => {
  try {
    const { quantity } = req.body;
    const updated = await Cart.updateQuantity(req.user.id, req.params.productId, quantity);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating cart item' });
  }
});

router.delete('/:productId', authenticateJWT, async (req, res) => {
  try {
    await Cart.removeItem(req.user.id, req.params.productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while removing cart item' });
  }
});

router.delete('/', authenticateJWT, async (req, res) => {
  try {
    await Cart.clearCart(req.user.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while clearing the cart' });
  }
});

module.exports = router;