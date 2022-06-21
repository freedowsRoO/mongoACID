const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  idClient: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  idHotel: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Hotel',
  },
  dateReservation: {
    type: String,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema, 'Reservation');
