// NPM dependencies
const { to } = require("await-to-js");

// App dependencies
const winston = require('../../config/winston');
const common = require('../common/common');

module.exports = {
  async userLogin(req, res, next) {
    const { email, password } = req.body;
    winston.info(`logging user with email: ${email} and password ${password}`);
    res.status(401).send(common.getResponseObject("Wrong password", 401, 0));
  },
  async signupUser(req, res, next) {
    const { email, password } = req.body;
    winston.info(`Signing up user with email: ${email} and password ${password}`);
    res.status(200).send(common.getResponseObject("Signup successfully", 200));
  },
};