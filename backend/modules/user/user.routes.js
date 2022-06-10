// App dependencies
const errorMiddleware = require("../common/error-middleware");
const userController = require("./user.controller");
const userMiddleware = require("./user.middleware");

const resource = "/user";

module.exports = function (app, version) {
  app.post(
    `${version}${resource}/sign-up`,
    userMiddleware.validateSignupParams,
    errorMiddleware,
    userController.signupUser
  );
  app.post(
    `${version}${resource}/login`,
    userMiddleware.validateLoginParams,
    errorMiddleware,
    userController.userLogin
  );
};

