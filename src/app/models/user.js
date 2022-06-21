const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  haveReservation: {
    type: Boolean,
    default: false
  },
  dateCreation: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema, 'User');
