const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      const error = new Error('User by that email already exists');
      error.status = 400;
      next(error);
    }
    else {
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      });
      user.save((err) => {
        if (err) {
          const error = new Error('You missed a field');
          error.status = 400;
          next(error);
        } else {
          const token = jwt.sign(user, 'secret');
          res.json({
            message: 'Signup Successful',
            token
          });
        }
      });
    }
  });
});

module.exports = router;