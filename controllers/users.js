const logger = require('../utils/logger');
const Users = require('../models/User');

const defaultFields = ['id', 'firstName', 'lastName', 'email', 'practice', 'roles'];

const findById = async ({ id, res }) => {
  if (!parseInt(id, 10)) {
    res.status(400).json({
      message: 'Invalid Id passed as parameter, number as userId expected',
    });
  } else {
    try {
      const user = await Users.findById(id, { attributes: defaultFields });
      if (user) {
        return user;
      }
      res.status(404).json({
        message: 'No user found',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'There was an error while trying to retrive information for this user',
      });
    }
  }
};

module.exports.getUserInformation = async (id) => {
  const user = await Users.findById(id, { attributes: defaultFields });
  return user;
};

// GET => /api/v1/users/:id
module.exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await findById({ id, res });
  if (user) {
    res.json({
      user,
    });
  }
};

// GET => /api/v1/users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: defaultFields,
    });
    if (users.length > 0) {
      res.json({
        users,
      });
    } else {
      res.status(404).json({
        message: 'No Users found',
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message: 'error found while retrieving users, check the logs to see what the error is about',
    });
  }
};

// POST => /api/v1/users
module.exports.addNewUser = async (req, res) => {
  // TO-DO
  // add validation for required fields
  const {
    firstName, lastName, email, practice, roles, password,
  } = req.body;
  try {
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      practice,
      roles,
      password,
    });
    res.status(201).json({
      user: {
        id: newUser.id,
        firstName,
        lastName,
        email,
        practice,
        roles,
      },
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message: 'there was an error while creating this user',
    });
  }
};

// PATCH => /api/v1/users/:id
module.exports.updateExistingUser = async (req, res) => {
  // TO-DO
  // add validation for required fields
  const { id } = req.params;
  const user = await findById({ id, res });
  if (user) {
    const {
      firstName, lastName, email, practice, roles, password
    } = req.body;
    try {
      await Users.update(
        {
          firstName,
          lastName,
          email,
          practice,
          roles,
          password
        },
        { where: { id } },
      );
      res.json({
        message: 'User updated successfully'
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while updating this user',
      });
    }
  }
};

// DELETE => /api/v1/users/:id
module.exports.deleteExistingUser = async (req, res) => {
  const { id } = req.params;
  const user = await findById({ id, res });
  if (user) {
    try {
      await Users.destroy({
        where: {
          id,
        },
      });
      res.json({
        message: 'User deleted successfully',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while deleting this user',
      });
    }
  }
};
