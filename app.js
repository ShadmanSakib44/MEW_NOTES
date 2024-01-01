const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const flash = require('connect-flash');
const bodyparser = require('body-parser');
const path = require('path');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection success message
mongoose.connection.once('connected', () => {
  console.log('MongoDB connected successfully');
});

// MongoDB connection error message
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Passport configuration
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));

// Session configuration
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Route handlers
app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use(require('./routes/note'));
app.use('/auth', require('./routes/passwordReset')); // Include password reset routes
app.use('/imageUpload', express.static('imageUpload'));
app.use('/audioUpload', express.static('audioUpload'));

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
