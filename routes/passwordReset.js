const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs'); // bcryptjs for password hashing

const usermail = process.env.USERMAIL;
const userpass = process.env.USERPASS;

// POST: Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Generate and set password reset token and expiration
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Example with Gmail service
      auth: {
        user: usermail,
        pass: userpass,
      },
    });

    // Send email with reset link
    let info = await transporter.sendMail({
      from: '"Password Reset" <shoumik9926@gmail.com>', // Replace with your email
      to: email,
      subject: 'Password Reset Link',
      html: `<p>You requested a password reset. Please follow this <a href="http://${req.headers.host}/auth/reset-password?token=${token}">link</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    console.log('Message sent: %s', info.messageId);
    res.send('Password reset link sent to email');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET: Reset Password
router.get('/reset-password', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }

    // Render the reset-password page with the token
    res.render('reset-password', { token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST: Update Password
// POST: Update Password
router.post('/update-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      // Show SweetAlert for an invalid or expired token
      return res.send('<script>alert("Password reset token is invalid or has expired."); window.location.href = "/";</script>');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Show SweetAlert for a successful password update
    return res.send('<script>alert("Password updated successfully."); window.location.href = "/";</script>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
