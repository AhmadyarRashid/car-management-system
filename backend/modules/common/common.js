// NPM Dependencies
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// APP Dependencies
const constant = require('../../config/constants');

// Common utility functions that can be used by all modules.
module.exports = {
  /**
   * split and hashing password
   */
  cryptPassword(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err)
        return callback(err);
      bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
      });
    });
  },
  /**
   * Compare password
   */
  comparePassword(plainPass, hashPass, callback) {
    bcrypt.compare(plainPass, hashPass, function(err, isPasswordMatch) {
      return err == null ?
        callback(null, isPasswordMatch) :
        callback(err);
    });
  },
  /**
   * Verify Token
   */
  verifyToken(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith(constant.tokenHeaderKey)) {
      next({
        msgCode: "0003",
        status: 401,
      });
    } else {
      const idToken = req.headers.authorization.substring(7, req.headers.authorization.length);
      try {
        req.user = jwt.verify(idToken, constant.tokenKey);
      } catch (err) {
        next({
          msgCode: "0003",
          status: 401,
        });
      }
      return next();
    }
  },

  /**
   * This method creates a response object with given params.
   */
  getResponseObject(msg, responseCode, success = 1, data = {}) {
    return {
      success: success,
      response: responseCode,
      message: msg,
      payload: data,
    };
  },
};
