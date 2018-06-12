const Sequelize = require('sequelize');

const { Op } = Sequelize;

const {
  dbHost,
  dbPassword,
  dbPort,
  dbName,
  dbUsername,
  dbDialect,
} = require('../configuration');

module.exports = () => {
  const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
  return sequelize;
};
