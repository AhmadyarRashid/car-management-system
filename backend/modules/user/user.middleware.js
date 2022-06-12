// NPM dependencies
const { check } = require('express-validator');

module.exports = {
  validateSignupParams: [
    check("email", "1001").exists().isString(),
    check('email', '1002').isEmail(),
    check("firstName", "1005").exists().isString(),
    check("firstName", "1006").isLength({min: 3}),
    check("lastName", "1007").exists().isString(),
    check("lastName", "1008").isLength({min: 3}),
  ],
  validateLoginParams: [
    check("email", "1001").exists().isString(),
    check('email', '1002').isEmail(),
    check('password', '1003').exists().isString(),
  ],
};
