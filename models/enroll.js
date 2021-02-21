const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enrollSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pno: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Enroll', enrollSchema);