const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: null,
  },
  model: {
    type: String,
    default: null,
  },
  make: {
    type: String,
    default: null,
  },
  registrationNo: {
    type: String,
    default: null,
  },
  condition: {
    type: String,
    enum: ['Used', 'Brand New'],
    default: 'Used',
  },
  description: {
    type: String,
    required: true,
    minLength: 12,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("car", CarSchema);

module.exports = Car;
