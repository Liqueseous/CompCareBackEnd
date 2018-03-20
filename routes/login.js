const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bring in User model
const User = require('../models/user');

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({email: email}, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else 
    if (!user) {
      res.status(404).json({
        message: 'No User by this Email'
      });
    }
    else {
      if (bcrypt.compareSync(password, user.password)) {
        res.json({
          message: 'Login Successful'
        });
      } else {
        res.json({
          message: 'Passwords do not match.'
        });
      }
    }
  });
});

module.exports = router;