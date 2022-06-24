const { Router } = require('express');
const reservationController = require('../controllers/reservation.controller');

const reservationRouter = Router();

reservationRouter.post('/', reservationController.makeReservation);
reservationRouter.post('/transaction', reservationController.makeReservationWithTransaction);
reservationRouter.get('/users', reservationController.getUsers);
reservationRouter.get('/hotels', reservationController.getHotels);
reservationRouter.get('/', reservationController.getReservations);
reservationRouter.delete('/', reservationController.deleteReservations);

module.exports = reservationRouter;