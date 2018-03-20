const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else if (user) {
      return res.status(400).json({
        message: 'User by that email already exists'
      });
    }
    else {
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      });
      user.save((err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.json({
            message: 'Signup Successful'
          });
        }
      });
    }
  });
});

module.exports = router;