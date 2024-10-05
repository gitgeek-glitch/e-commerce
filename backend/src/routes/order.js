const express = require('express');
const Order = require('../models/order');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const orderId = await Order.create(req.user.id, req.body.products);
    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

router.get('/:id/status', authenticateJWT, async (req, res) => {
  try {
    const order = await Order.getStatus(req.params.id, req.user.id);
    if (order) {
      res.json({ status: order.status });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the order status' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.getUserOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user orders' });
  }
});

module.exports = router;