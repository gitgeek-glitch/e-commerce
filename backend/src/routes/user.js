const express = require('express');
const User = require('../models/user');
const authenticateJWT = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const router = express.Router();

// Registration route with OTP
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create the user without activating it yet
    const user = await User.create(username, email, password);

    // Generate an OTP and set expiry time
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 mins

    // Save OTP in the database
    await pool.query(
      'INSERT INTO user_otps (user_id, otp, expires_at) VALUES ($1, $2, $3)',
      [user.id, otp, otpExpiresAt]
    );

    // Set up nodemailer to send the OTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to your email. Please verify to complete registration.', userId: user.id });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


// OTP verification route
router.post('/verify-otp', async (req, res) => {
  const { userId, otp } = req.body;

  try {
    console.log('Verifying OTP:', { userId, otp });

    const result = await pool.query(
      'SELECT * FROM user_otps WHERE user_id = $1 AND otp = $2 AND expires_at > NOW()',
      [userId, otp]
    );

    console.log('OTP verification result:', result.rows);

    if (result.rows.length === 0) {
      console.error('Invalid or expired OTP');
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Mark the user as verified
    await pool.query('UPDATE users SET verified = true WHERE id = $1', [userId]);

    // Clean up the OTP
    await pool.query('DELETE FROM user_otps WHERE user_id = $1', [userId]);

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});



// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(400).json({ error: 'Please verify your email to login' });
    }

    // Authenticate user
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;