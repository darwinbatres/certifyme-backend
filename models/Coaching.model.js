const Sequelize = require('sequelize');
const { db } = require('../configuration/db');

const sequelize = db();

const Coaching = sequelize.define('coaching', {
  coachId: Sequelize.INTEGER,
  coacheeId: Sequelize.INTEGER,
});

// Create the table if it doesn't exist
// TO-DO
Coaching.sync();
// Coaching.sync({force: true});

module.exports = Coaching;
