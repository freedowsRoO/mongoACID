const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: false
  },
  available: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model('Hotel', hotelSchema, 'Hotel');
