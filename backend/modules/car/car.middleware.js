// NPM dependencies
const { check } = require('express-validator');

module.exports = {
  category: [
    check("name", "2001").exists().isString(),
    check('name', '2002').isLength({min: 3}),
  ],
  validateParamId: [
    check('id', '2004').isMongoId(),
  ],
  validateLoginParams: [
    check("email", "1001").exists().isString(),
    check('email', '1002').isEmail(),
    check('password', '1003').exists().isString(),
  ],
};
