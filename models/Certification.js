const Sequelize = require('sequelize');
const { db } = require('../configuration/db');

const sequelize = db();

const Certification = sequelize.define('certification', {
  name: Sequelize.STRING,
  addedBy: Sequelize.INTEGER,
  practice: Sequelize.STRING,
  expired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  version: Sequelize.STRING,
});

// Create the table if it doesn't exist
// TO-DO
Certification.sync();
// Certification.sync({force: true});

module.exports = Certification;
