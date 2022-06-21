require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.express = express();

    this.midddlewares();
    
    this.routes();
  }

  midddlewares() {  
    this.express.use(cors());
    this.express.use(bodyParser.json({ limit: '20mb', extended: true }));
    this.express.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  }

  views() {}

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
