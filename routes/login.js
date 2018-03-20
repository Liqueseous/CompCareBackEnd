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
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            message: 'Wrong Password'
          });
        } else {
          token = jwt.sign({user: user}, 'secretkey');
          res.json({token});
        }
      });
    }
  });
});

module.exports = router;