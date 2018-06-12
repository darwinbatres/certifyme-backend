const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.getAll);
router.post('/:userId', controller.getOne);
router.post('/', controller.add);
router.patch('/:userId', controller.update);
router.delete('/:userId', controller.delete);

module.exports = router;
