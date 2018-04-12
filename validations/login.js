const Validator = require('validator');

function validateInput(data) {
  const errors = {};
  let isValid = true;

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Must be a valid email adress';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (errors.password || errors.email) {
    isValid = false;
  }

  return {
    errors,
    isValid
  }
}

module.exports = validateInput;
