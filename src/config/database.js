const mongoose = require('mongoose');
const logger = require('../app/util/logger');
const InitCollection = require('../config/initCollections')

class Database {

  constructor() {
    this.url = 'mongodb://localhost:27017/bd-transaction';
    this._client = null;
    this.options = {      
      useNewUrlParser: true,
      useUnifiedTopology: true,     
      socketTimeoutMS: 100000,
    };
  }

  /**
   * Retorna a referência para o cliente (conexão) com banco de dados
   *
   * @returns {null|mongoose.connection} null caso não exista conexão e uma instância de conexão caso exista
   * @access public
   * @memberOf Database
   */
  get client() {
    return this._client;
  }

    /**
   * Executa uma rotina para criar dados padrões do sistema, caso não exista
   * no banco atualmente conectado.
   *
   * @returns {Promise<void>} apenas executa a rotina, sem retorno
   * @access private
   * @memberOf Database
   */
  async _initCollections() {
    await InitCollection.initCollectionHotel();
    await InitCollection.initCollectionUser();
  }

  /**
   * Executa a rotina de inicialização da conexão com banco de dados.
   * Caso já exista uma conexão, nada é executado.
   * Ao final da execução, com a conexão estabelecidade, é iniciado o serviço
   * Agenda, utilizando a mesma conexão criada.
   *
   * @returns {Promise<void>} apenas executa a rotina, sem retorno
   * @access public
   * @memberOf Database
   */
  async init() {
    try {
      if (this._client) {
        return;
      }

      logger.debug(`Starting MongoDB Connection....`);

      await mongoose.connect(this.url, this.options);
      this._client = mongoose.connection;

      this._client.on('disconnected', () => {
        process.exit(1);
      });

      logger.debug('MongoDB Connected!');      

      await this._initCollections();
      
    } catch (error) {
      logger.error(`MongoDB Error Connection - ${error.message}`);
      throw error;
    }
  }
}

const database = new Database();

module.exports = {
  initDatabase: async () => {
    await database.init();
    return database;
  },
  database,
};
