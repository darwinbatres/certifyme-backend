const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

// /api/v1/users
router.get('/', controller.getAllUsers); // done
router.get('/:id', controller.getOneUser); // done
router.post('/', controller.addNewUser); // done
router.patch('/:id', controller.updateExistingUser); // done
router.delete('/:id', controller.deleteExistingUser);

module.exports = router;
