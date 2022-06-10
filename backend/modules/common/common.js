// Common utility functions that can be used by all modules.
module.exports = {
  /**
   * Validates Password.
   * Password validation criteria
   * Password must be at least 8 characters long.
   * It must contain at least 1 uppercase letter, 1 special character
   * and 1 number
   */
  passwordValidator(password) {
    return new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ).test(password);
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
