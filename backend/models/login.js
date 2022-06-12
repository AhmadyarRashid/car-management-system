const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Login = mongoose.model("login", LoginSchema);

module.exports = Login;
