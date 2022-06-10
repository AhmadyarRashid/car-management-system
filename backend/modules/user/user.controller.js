// NPM dependencies
const { to } = require("await-to-js");

// App dependencies
const winston = require('../../config/winston');
const common = require('../common/common');
const userModel = require('../../models/user');

module.exports = {
  async userLogin(req, res) {
    const { email, password } = req.body;
    const user = new userModel({name: 'ali', age: 24})
    const [isError, userResponse] = await to(user.save());
    if (isError) {
      winston.error(`user save error on ${isError}`);
    } else {
      winston.info(`User created response ${userResponse}`);
      res.status(201).send(common.getResponseObject("User Created", 201, 1, userResponse));
    }
  },
  async signupUser(req, res) {
    const { email, password } = req.body;
    winston.info(`Signing up user with email: ${email} and password ${password}`);
    res.status(200).send(common.getResponseObject("Signup successfully", 200));
  },
};
