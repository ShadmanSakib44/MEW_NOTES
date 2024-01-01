const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
//const crypto = require('crypto'); // For generating the token
const User = require('../models/User');
//const nodemailer = require('nodemailer'); // For sending emails
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/log');
  }
);

// @desc    Register new user
// @route   POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).send('Email already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/log');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @desc    Login user
// @route   POST /auth/login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/log',
  failureRedirect: '/',
  failureFlash: true
}));

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
