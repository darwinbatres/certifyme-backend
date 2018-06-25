const faker = require('faker');
const logger = require('../utils/logger');

// models
const Certification = require('../models/Certification');
const User = require('../models/User');
const Coaching = require('../models/Coaching');

const totalUsers = 15;
const practices = ['DEVELOPMENT', 'QE', 'R&D'];
const roles = ['coach', 'coachee', 'coach coordinator', 'Practice Lead', 'HR', 'HR manager'];
const certifications = [
  {
    name: 'Certified System Architect (CSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v6.2',
  },
  {
    name: 'Certified System Architect (CSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v7.1',
  },
  {
    name: 'Certified System Architect (CSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v7.2',
  },
  {
    name: 'Certified Senior System Architect (CSSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v6.2',
  },
  {
    name: 'Certified Senior System Architect (CSSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v7.3',
  },
  {
    name: 'Lead System Architect (LSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v6.2',
  },
  {
    name: 'Lead System Architect (LSA)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v7.3',
  },
  {
    name: 'Certified UI Specialist (CUIS)',
    addedBy: 1,
    practice: 'DEVELOPMENT',
    version: 'v7.1',
  },
  {
    name: 'ISTQB',
    addedBy: 1,
    practice: 'QE',
    version: 'v1.0',
  },
  {
    name: 'ISTQB',
    addedBy: 1,
    practice: 'QE',
    version: 'v2.0',
  },
  {
    name: 'ISTQB Level 2',
    addedBy: 1,
    practice: 'QE',
    version: 'v1.0',
  },
  {
    name: 'ISTQB Level 2',
    addedBy: 1,
    practice: 'QE',
    version: 'v2.0',
  },
];

// generate random practice
const randomRole = () => {
  const totalRoles = roles.length;
  const index = Math.floor(Math.random() * totalRoles);
  return roles[index];
};

// generate random practice
const randomPractice = () => {
  const totalPractices = practices.length;
  const index = Math.floor(Math.random() * totalPractices);
  return practices[index];
};

// will delete (and recreate/drop) existing tables
// if new tables are added, they also need to be added here
const dropExistingTables = async () => {
  logger.info('\n ***** Deleting and recreating models *****');
  await Certification.sync({ force: true });
  await User.sync({ force: true });
  await Coaching.sync({ force: true });
};

// generate n random users
const generateUsers = async ({ total }) => {
  logger.info('\n ***** Generating random users *****');
  if (total > 0) {
    for (let i = 0; i < total; i++) {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        practice: randomPractice(),
        roles: randomRole(),
        password: 'password',
      };
      await User.create(user);
    }
    logger.info(`${total} users created!`);
  }
};

// generate certifications
const generateCertifications = async () => {
  logger.info('\n ***** Generating certifications *****');
  for (let i = 0; i < certifications.length; i++) {
    await Certification.create(certifications[i]);
  }
  logger.info(`${certifications.length} certifications created!`);
};

// generate relations coach-coachee
const generateRelations = async () => {
  logger.info('\n ***** Generating relations coach-coachee *****');
  for (let i = 1; i <= totalUsers - 1; i++) {
    await Coaching.create({
      coachId: i,
      coacheeId: i + 1,
    });
  }
  logger.info(`${totalUsers - 1} relations coach-coachee created!`);
};

// initial function to be executed
const initialize = async () => {
  try {
    await dropExistingTables();
    await generateUsers({ total: totalUsers });
    await generateCertifications();
    await generateRelations();
    process.exit(0);
  } catch (err) {
    logger.error('there was an error while generating data, please check the below error');
    logger.error(err);
  }
};

initialize();
