const { Hotel, User } = require('../app/models/index');
const HotelData = require('./hotelData');
const UserData = require('./userData');
const logger = require('../app/util/logger');

class InitCollection {
  async initCollectionHotel() {
    const data = HotelData.data;
  
    const result = await Hotel.find({}).limit(1).lean();
   
    if (result.length === 0) {
      await Hotel.insertMany(data)
        .then(() => {
          logger.info('Collection Hotel inicializada');
        })
        .catch((error) => {
          logger.error(error);
        });
    } else {
      await Promise.all(
        data.map(async (element) => {
          const existePlan = await Hotel.findOne({ name: element.name });

          if (!existePlan) {
            await Hotel.create(element)
              .then(logger.info(`Plano ${element.name} inserido`))
              .catch((error) => logger.error(`${error.message}`));
          }
        })
      );
    }
  }

  async initCollectionUser() {
    const data = UserData.data;
  
    const result = await User.find({}).limit(1).lean();
   
    if (result.length === 0) {
      await User.insertMany(data)
        .then(() => {
          logger.info('Collection User inicializada');
        })
        .catch((error) => {
          logger.error(error);
        });
    } else {
      await Promise.all(
        data.map(async (element) => {
          const existePlan = await User.findOne({ name: element.name });

          if (!existePlan) {
            await User.create(element)
              .then(logger.info(`Plano ${element.name} inserido`))
              .catch((error) => logger.error(`${error.message}`));
          }
        })
      );
    }
  }
}

module.exports = new InitCollection();
