// NPM Dependencies
const bcrypt = require('bcrypt');

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
   * This method creates a response object with given params.
   */
  getResponseObject(msg, responseCode, success = 1, data = {}) {
    return {
      success: success,
      response: responseCode,
      message: msg,
      data: data,
    };
  },
};
