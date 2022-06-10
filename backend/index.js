// NPM dependencies
const express = require('express');
const { urlencoded, json } = require("body-parser");
const cors = require('cors');

// App dependencies
const winston = require('./config/winston');
const constants = require('./config/constants');
const dbConnect = require('./config/dbConfig');

// Get Server Port
const port = process.env.PORT || 3001;

const app = express();

dbConnect.connect().then(() => {
  winston.info('Connected to MongoDB Successfully');

  // Parsing request body.
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  require("./config/express")(app);

  // Add Basic Header in every request
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Expose-Headers", constants.tokenHeaderKey);
    next();
  });

  app.get('/', (req, res) => {
    res.send('Server is running.');
  });

  app.listen(port, () => {
    winston.info(`Server listening on ${port}`);
  });
}).catch(error => {
  winston.error(`Error on DB connection ${error}`);
});
