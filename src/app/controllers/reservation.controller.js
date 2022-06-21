const mongoose = require('mongoose');
const { Hotel, User, Reservation } = require('../models');

const makeReservation = async (req, res, next) => {   
   const { clientName, hotelName, dateReservation} = req.body;
    try {
         const user = await User.findOne({ name: clientName });
         if (!user || user.length === 0) {
            await User.create({ name: clientName });
         }

         const hotel = await Hotel.findOne({ name: hotelName });
         if (!hotel || hotel.length === 0) {
            throw 'Invalid Hotel';            
         }         

         const result = await Reservation.create([
            {
               idClient: user._id,
               idHotel: hotel._id,
               dateReservation: dateReservation
            }
         ]);

         console.log('result',result)

         if (!dateReservation || dateReservation === '') {
            throw 'Invalid Date';
         }

        return res.status(200).json(result);
    } catch (e) {      
      return res.status(400).json(e);
    } 
 };

 const makeReservationWithTransaction = async (req, res, next) => {   
   const session = await mongoose.startSession();
   const { clientName, hotelName, dateReservation} = req.body;
   try {
      session.startTransaction();    

      const user = await User.findOne({ name: clientName }, null, { session });
      if (!user || user.length === 0) {
         await User.create({ name: clientName }, { session });
      }

      const hotel = await Hotel.findOne({ name: hotelName }, null, { session });
      if (!hotel || hotel.length === 0) {
         throw 'Invalid Hotel';            
      }      

      const result = await Reservation.create([
         {
            idClient: user._id,
            idHotel: hotel._id,
            dateReservation: dateReservation
         }
      ], { session });    
      
      if (!dateReservation || dateReservation === '') {
         throw 'Invalid Date';
      }
       
       await session.commitTransaction();
       return res.status(200).json(result);
   } catch (error) {
       console.log('error',error);
       await session.abortTransaction();  
       return res.status(400).json(error);
   } finally {
      session.endSession();
    }
 };

 const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
 };

 const getHotels = async (req, res, next) => {
   const hotels = await Hotel.find();
   res.status(200).json(hotels);
};

const getReservations = async (req, res, next) => {
   const reservations = await Reservation.find();
   res.status(200).json(reservations);
};

module.exports = {
   getUsers,
   getHotels,
   getReservations,
   makeReservation,
   makeReservationWithTransaction
}