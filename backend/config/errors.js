// NPM dependencies
const glob = require("glob");
const _ = require("lodash");
const fs = require("fs");

// App dependencies
const winston = require("./winston");

winston.info("Loading error messages");
const routePath = "modules/**/*.errors.json";
const errorObject = {
  "0001": {
    msg: "User id not available in provided token.",
  },
  "0002": {
    msg: "No user found with the provided id",
  },
  "0003": {
    msg: "User is not authenticated.",
  },
  "0004": {
    msg: "User is not authorized to visit this api.",
  },
  "0005": {
    msg: "Something went wrong.",
  },
  "0006": {
    msg: "User Roles not found.",
  },
  "0007": {
    msg: "Unauthorized Role.",
  },
};

glob.sync(routePath).forEach((file) => {
  _.extend(errorObject, JSON.parse(fs.readFileSync(file, "utf-8")));
  winston.info(`'${file}' +  is loaded`);
});

module.exports = errorObject;