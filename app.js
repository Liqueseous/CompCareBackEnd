const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

// jwt decoding middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  tokendata = jwt.verify(token, process.env.JWT_SECRET);
  req.userData = tokendata;
  next();
});

// Use tickets routes
app.use('/tickets', tickets);

app.get('/', (req, res) => {
  res.send('Welcome to CompCare');
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
