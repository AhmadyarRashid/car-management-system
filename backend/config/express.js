// NPM dependencies
const { map } = require('lodash');

// App dependencies
const winstonLog = require("./winston");
const errorCodes = require("./errors");
const constants = require('./constants');

module.exports = (app) => {
  require("./routes")(app);

  app.get("/*", (req, res) => {
    winstonLog.error(`[${req.method}][${req.originalUrl}] Invalid API endpoint`);
    res.status(404);
    res.json({
      success: 0,
      message: "Not Found",
      response: 404,
      data: {},
    });
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.name === constants.errorTypes.expressValidatorError) {
      winstonLog.error(
        `[${req.method}][${req.originalUrl
        }] Validation failed: ${JSON.stringify(req.body)}`
      );
      const errors = map(err.errors, (code) => ({
        message: errorCodes[code].msg,
        code,
      }));
      res.json({
        success: 0,
        message: "Errors encountered while validating request parameters.",
        response: err.status,
        data: {},
        errors,
      });
    } else if (err.status === 404 && err.msgCode) {
      winstonLog.error(
        `[${req.method}][${req.originalUrl}] Record doesn't exist.`
      );
      res.json({
        success: 0,
        message: errorCodes[err.msgCode].msg,
        response: 404,
        data: {},
      });
    } else if (err.status === 500 && err.msgCode) {
      winstonLog.error(
        `[${req.method}][${req.originalUrl}] ${JSON.stringify(err.data)}`
      );
      const data = err.data || {};
      res.status(err.status).json({
        success: 0,
        message: errorCodes[err.msgCode].msg,
        response: err.status,
        data,
      });
    } else if (err.msgCode) {
      const data = err.data || {};
      res.json({
        success: 0,
        message: errorCodes[err.msgCode].msg,
        response: err.status,
        data,
      });
    } else if (err.message) {
      err.status = 500;
      const data = err.data || {};
      res.json({
        success: 0,
        message: err.message,
        response: err.status,
        data,
      });
    } else {
      res.json({
        success: 0,
        message: "Something went wrong. Please try again.",
        response: 304,
        data: {},
      });
    }
  });
};
