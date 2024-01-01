const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        
callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userData = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,

            
image: profile.photos[0].value,
            email: profile.emails[0].value,
          };

          const existingUser = await User.findOne({ googleId: profile.id });
          const user = existingUser || await User.create(userData);
          done(null, user);
        } catch (err) {
          console.error(err); // Log for debugging
          done(err); // Return error to user or handle appropriately
        }
      }
    )
  );

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
  
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      } catch (err) {
        console.error(err);
        done(err);
      }
    })
  );
  

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};