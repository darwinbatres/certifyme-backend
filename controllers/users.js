const Users = require('../models/User');

module.exports.getAll = (req, res) => {
  Users.findAll()
    .then(users => {
      res.json({
        response: {
          data: {
            users
          }
        }
      });
    })
    .catch(err => {
      console.log(err)
      res.json({
        message: 'error found while retrieving users',
      });
    });
};

module.exports.getOne = (req, res) => {
  const { userId } = req.params;
  
  Users.findOne({ where: { id: userId } })
    .then(user => {
      if(user) {
        res.json({ response: {
        data: {
          user
        }
      } })
      } else {
        res.json({ response: {
          errors: [
            {
              message: 'No user found'
            }
          ]
      } })
      }
    })
    .catch(err => {
      res.json({ response: {
        errors: [
          {
            message: 'There was an error while trying to retrive information for this user'
          }
        ]
      } })
    })
};

module.exports.add = (req, res) => {
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
          user
        }
      } })
    })
    .catch(err => {
      res.json({ response: {
        message: 'there was an error while creating this user'
      } })
    })
  
};

module.exports.update = (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, practice, roles, password } = req.body;
  
  Users.update(
   {firstName, lastName, email, practice, roles },
   { where: { id: userId } }
   )
   .then((users) => {
     res.json({ message: 'success' })
   })
   .catch(err => {
     console.log(err)
   })
  
};

module.exports.delete = (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, practice, roles, password } = req.body;
  
  Users.destroy({
    where: {
      id: userId
    }
  })
    .then(() => {
      res.json({ message: 'user deleted!' })
    })
    .catch(err => {
      res.json({ message: 'user not deleted man' })
    });
};