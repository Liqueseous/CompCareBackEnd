const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

const validateInput = require('../validations/signup');

router.post('/', (req, res, next) => {
  let validationStatus = validateInput(req.body);
  if (!validationStatus.isValid) return;
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      const error = new Error('User by that email already exists');
      error.status = 400;
      next(error);
    }
    else {
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        numTickets: 0,
      });
      user.save((err) => {
        if (err) {
          const error = new Error('You missed a field');
          error.status = 400;
          next(error);
        } else {
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
          return res.json({
            message: 'Signup Successful',
            token
          });
        }
      });
    }
  });
});

module.exports = router;
