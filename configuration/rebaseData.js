const logger = require('../utils/logger');

// models
const Certification = require('../models/Certification.model');
const User = require('../models/User.model');
const Coaching = require('../models/Coaching.model');

// will delete (and recreate/drop) existing tables
// if new tables are added, they also need to be added here
const dropExistingTables = async () => {
  logger.info('\n ***** Deleting and recreating models *****');
  await Certification.sync({ force: true });
  await User.sync({ force: true });
  await Coaching.sync({ force: true });
  logger.info('\n ***** Tables were successfully deleted *****');
};

// initial function to be executed
const initialize = async () => {
  try {
    await dropExistingTables();
    process.exit(0);
  } catch (err) {
    logger.error('there was an error while rebasing existing tables, please check the below error');
    logger.error(err);
  }
};

initialize();
