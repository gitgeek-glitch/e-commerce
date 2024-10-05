const express = require('express');
const authenticateJWT = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

router.get('/impact', authenticateJWT, async (req, res) => {
  try {
    // Simulate sustainability metrics based on the user's orders
    const carbonSaved = 120;  // kg CO2
    const wasteReduced = 50;  // kg waste
    
    // Send the metrics to the frontend
    res.json({ carbonSaved, wasteReduced });
  } catch (error) {
    console.error('Error fetching sustainability metrics:', error);
    res.status(500).json({ error: 'Failed to fetch sustainability metrics' });
  }
});

module.exports = router;
