const Sequelize = require('sequelize');
const { db } = require('../configuration/db');

const sequelize = db();

const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.TEXT,
  email: Sequelize.TEXT,
  practice: Sequelize.TEXT,
  roles: Sequelize.TEXT,
  password: Sequelize.TEXT,
});

// Create the table if it doesn't exist
// TO-DO
// User.sync({force: true});

module.exports = User;