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

module.exports = async () => {
  const sequelize = await new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    options: {
      encrypt: false
    }
  });
  
  await sequelize
  .authenticate()
  .then(() => {
    console.log('connection was successful');
  })
  .catch(err => {
    console.log('error while connecting to the db');
    console.log(err);
  });
  
};
