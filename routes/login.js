const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

const validateInput = require('../validations/login');

router.post('/', (req, res, next) => {
  let validationStatus = validateInput(req.body);
  if (!validationStatus.isValid) return res.json(validationStatus.errors);
  const { email, password } = req.body;
  User.findOne({email: email}, (err, user) => {
    if (err) {
      next(err);
    } else 
    if (!user) {
      const error = new Error('No User by this Email');
      error.stack = 404;
      next(error);
    }
    else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(user.toJSON(), 'secret');
        return res.json({
          message: 'Login Successful',
          token
        });
      } else {
        const error = new Error('Passwords do not match.');
        error.stack = 400;
        next(error);
      }
    }
  });
});

module.exports = router;