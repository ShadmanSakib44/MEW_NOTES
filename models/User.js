const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false, // Not required
  },
  displayName: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  username: {
    type: String,
    required: false, // Not required
  },
  password: {
    type: String,
    required: false, // Not required
  },
  phoneNumber: {
    type: String,
    required: false, // Not required
  },
  email: {
    type: String,
    required: false, // Not required
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
