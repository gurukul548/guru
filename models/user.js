const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  pname: {
    type: String,
    required: true
  },
  sname: {
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
  password: {
      type: String,
      required: true
  },
  standard: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);