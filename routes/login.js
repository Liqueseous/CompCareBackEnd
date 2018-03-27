const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

const validateInput = require('../validations/login');

router.post('/', (req, res, next) => {
  let validationStatus = validateInput(req.body);
  if (!validationStatus.isValid) return;
  const { email, password } = req.body;
  User.findOne({email: email}, (err, user) => {
    if (err) {
      next(err);
    } else 
    if (!user) {
      const error = new Error('No User by this Email');
      error.status = 404;
      next(error);
    }
    else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        return res.json({
          message: 'Login Successful',
          token
        });
      } else {
        const error = new Error('Passwords do not match.');
        error.status = 400;
        next(error);
      }
    }
  });
});

module.exports = router;