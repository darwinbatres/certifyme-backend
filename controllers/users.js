const logger = require('../utils/logger');
const Users = require('../models/User');

module.exports.getAllUsers = (req, res) => {
  Users.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'practice'
    ]
  })
    .then(users => {
      if(users.length > 0) {
        res.json({
          response: {
            data: {
              users
            }
          }
        });
      } else {
        res.status(404).json({
          response: {
            data: {
              message: 'No users found'
            }
          }
        });
      }
    })
    .catch(err => {
      logger.error(err);
      res.status(500).json({
        response: {
          errors: [
            {
              message: 'error found while retrieving users, check the logs to see what the error is about'
            }
          ]
        }
      });
    });
};

module.exports.getOneUser = (req, res) => {
  const { id } = req.params;
  
  Users.findOne({ where: { id } })
    .then(user => {
      if(user) {
        res.json({ response: {
        data: {
          user
        }
      } })
      } else {
        res.status(404).json({ 
          response: {
            data: {
              message: 'No user found'
            }
      } })
      }
    })
    .catch(err => {
      logger.error(err);
      res.status(500).json({ 
        response: {
          errors: [
            {
              message: 'There was an error while trying to retrive information for this user'
            }
          ]
      } })
    })
};

module.exports.addNewUser = (req, res) => {
  // TO-DO
  // add validation for required fields
  const { firstName, lastName, email, practice, roles, password } = req.body;
  Users.create({
    firstName,
    lastName,
    email,
    practice,
    roles,
    password
  })
    .then(user => {
      res.json({ response: {
        data: {
          message: 'User created successfully',
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            practice,
            roles
          }
        }
      } })
    })
    .catch(err => {
      logger.error(err);
      res.status(500).json({ 
        response: {
          errors: [
            {
              message: 'there was an error while creating this user'
            }
          ]
      } })
    })
  
};

module.exports.updateExistingUser = (req, res) => {
  // TO-DO
  // add validation for required fields
  const { id } = req.params;
  const { firstName, lastName, email, practice, roles } = req.body;
  
  Users.update(
   {firstName, lastName, email, practice, roles },
   { where: { id } }
   )
   .then((users) => {
     res.json({
       response: {
         data: {
           message: 'User updated successfully',
         }
       }
     })
   })
   .catch(err => {
     logger.error(err);
     res.status(500).json({ 
        response: {
          errors: [
            {
              message: 'there was an error while updating this user'
            }
          ]
      } })
   })
  
};

module.exports.deleteExistingUser = (req, res) => {
  const { id } = req.params;
  
  Users.destroy({
    where: {
      id
    }
  })
    .then(() => {
      res.json({
        response: {
          data: {
            message: 'User deleted successfully'
          }
        }
      })
    })
    .catch(err => {
      logger.error(err);
      res.status(500).json({ 
        response: {
          errors: [
            {
              message: 'there was an error while deleting this user'
            }
          ]
      } })
    });
};