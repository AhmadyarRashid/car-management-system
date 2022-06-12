// NPM dependencies
const { to } = require("await-to-js");

// App dependencies
const winston = require('../../config/winston');
const common = require('../common/common');
const loginModel = require('../../models/login');
const userModel = require('../../models/user');

module.exports = {
  // login controller
  userLogin(req, res, next) {
    const { email, password } = req.body;
    loginModel.find({email}, async (err, response) => {
      if (err) {
        winston.error(`Signup failed error ${err}`);
        next(err);
      } else if (response.length < 1) {
        next({
          msgCode: '1010',
          status: 401,
        });
      } else {
        const userLogin = response[0];
        common.comparePassword(password, userLogin.password, (err, isPassMatch) => {
          if (err) {
            next({
              msgCode: '0005',
              status: 401,
            });
          } else if (!isPassMatch) {
            winston.error(`Wrong password ${email}`);
            res.status(200).send(common.getResponseObject("Password is wrong!", 400));
          } else {
            res.status(200).send(common.getResponseObject("Login Successful", 200));
          }
        })
      }
    });
  },
  // signup controller
  async signupUser(req, res, next) {
    const { email, firstName, lastName } = req.body;
    loginModel.find({email}, async (err, isEmailExists) => {
      if (err) {
        winston.error(`Signup failed error ${err}`);
        next(err);
      } else if (isEmailExists.length > 0) {
        winston.error(`${email} already exists. Please use other one.`);
        next({
          msgCode: "1009",
          status: 401,
        });
      } else {
        const password = Math.random().toString(36).slice(0, 6);
        winston.info(`user email ${email} with password ${password}`);
        common.cryptPassword(password, async (err, hashPassword) => {
          if (err) {
            winston.error(`Error during creating password hash ${password}`);
            next({
              msgCode: "0005",
              status: 401,
            })
          } else {
            const login = new loginModel({email, password: hashPassword});
            const [isLoginError] = await to(login.save());
            if (isLoginError) {
              winston.error(`login error on ${isLoginError}`);
              next(isLoginError);
            } else {
              const user = new userModel({email, firstName, lastName});
              const [isUserError, userResponse] = await to(user.save());
              if (isUserError) {
                winston.error(`Signup user info save error ${isUserError}`);
                next(isUserError);
              } else {
                winston.info(`User created response ${userResponse}`);
                res.status(201).send(common.getResponseObject("User Created", 201, 1, userResponse));
              }
            }
          }
        });
      }
    });
  },
};
