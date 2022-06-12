const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
