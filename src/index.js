const server = require('./server');
const { initDatabase } = require('./config/database')
const logger = require('./app/util/logger');

initDatabase().then(() => {
  logger.debug(`Starting REST API....`);

  const port = 3333;
  server.listen(port, () => {
    logger.debug(`App listening on port ${port}!`);
  });
});
