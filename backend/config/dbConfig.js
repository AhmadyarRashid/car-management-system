// NPM dependencies
const mongoose = require('mongoose');

// DB connection
const username = 'ahmedyar61';
const password = encodeURIComponent('Pakistan786@');
const cluster = "cluster0.0y4f8.mongodb.net";
const dbname = "ropstam_car_sales";

module.exports = {
  async connect() {
    await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  },
};
