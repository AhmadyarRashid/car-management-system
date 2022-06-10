// NPM dependencies
const { check } = require('express-validator');

// App dependencies
const common = require('../common/common');

module.exports = {
  validateSignupParams: [
    check("email", "1001").exists().isString(),
    check("email", "1002").isEmail(),
    check('password', '1003').exists().isString(),
    check('password', '1004').custom(common.passwordValidator),
  ],
  validateLoginParams: [
    check("email", "1001").exists().isString(),
    check('email', '1002').isEmail(),
    check('password', '1003').exists().isString(),
  ],
};