const bcrypt = require('bcryptjs');
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

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt); // eslint-disable-line
  user.email = user.email.toLowerCase(); // eslint-disable-line
  return user;
});

// Create the table if it doesn't exist
// TO-DO
User.sync();
// User.sync({force: true});

module.exports = User;
