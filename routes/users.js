const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

// /api/v1/users
router.get('/', controller.getAllUsers);
router.get('/search', controller.search);
router.get('/:id', controller.getOneUser);
router.post('/', controller.addNewUser);
router.patch('/:id', controller.updateExistingUser);
router.delete('/:id', controller.deleteExistingUser);

module.exports = router;
