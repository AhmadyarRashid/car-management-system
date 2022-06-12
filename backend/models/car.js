const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  color: {
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
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("car", CarSchema);

module.exports = Car;
