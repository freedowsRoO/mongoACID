const router = require('express').Router();

const UserRouter = require('./user.routes');

router
  .use('/reservation/', UserRouter);

  module.exports = router;