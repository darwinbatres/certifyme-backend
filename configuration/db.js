const Sequelize = require('sequelize');

const { Op } = Sequelize;

const {
  dbHost, dbPassword, dbPort, dbName, dbUsername, dbDialect,
} = require('../configuration');

module.exports.db = () => {
  const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect.toLowerCase(),
    port: dbPort,
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    options: {
      encrypt: false,
    },
  });
  return sequelize;
};

module.exports.checkConnection = () => {
  const sequelize = this.db();
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
