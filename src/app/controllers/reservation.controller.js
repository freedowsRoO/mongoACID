const mongoose = require('mongoose');
const { Hotel, User, Reservation } = require('../models');

const makeReservation = async (req, res, next) => {   
   const { clientName, hotelName, dateReservation} = req.body;
    try {
         const user = await User.findOne({ name: clientName.toLowerCase() });
         if (!user || user.length === 0) {
            await User.create({ name: clientName });
         }

         const hotel = await Hotel.findOne({ name: hotelName });
         if (!hotel || hotel.length === 0) {
            throw 'Invalid Hotel';            
         }  
         
         if (!dateReservation || dateReservation === '') {
            throw 'Invalid Date';
         }

         const result = await Reservation.create([
            {
               idClient: user._id,
               idHotel: hotel._id,
               dateReservation: dateReservation
            }
         ]);

         await User.findOneAndUpdate({ _id: user._id }, { haveReservation: "teste"});

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
      
      if (!dateReservation || dateReservation === '') {
         throw 'Invalid Date';
      }

      const result = await Reservation.create([
         {
            idClient: user._id,
            idHotel: hotel._id,
            dateReservation: dateReservation
         }
      ], { session });          
     
      await User.findOneAndUpdate({ _id: user._id }, { haveReservation: "teste"});
       
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

const deleteReservations = async (req, res, next ) => {
   try {
      await Reservation.deleteMany();
      res.status(200).json({message: 'deletado'});
   } catch (error) {
      res.status(500).json({message: 'erro interno'});
   }
}  

module.exports = {
   getUsers,
   getHotels,
   getReservations,
   makeReservation,
   makeReservationWithTransaction,
   deleteReservations
}