const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Set up App
const app = express();

// Connect to the database
mongoose.connect(process.env.COMPCARE_DB);

// Set up BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// Set up CORS Middleware
app.use(cors());

// Bring in Signup route
const signup = require('./routes/signup');

// Bring in Login route
const login = require('./routes/login');

// Bring in Tickets routes
const tickets = require('./routes/tickets');

// Use signup route
app.use('/signup', signup);

// Use login route
app.use('/login', login);

// Use tickets routes
app.use('/tickets', tickets);

app.use('/', (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;