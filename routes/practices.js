const express = require('express');
const controller = require('../controllers/practices');

const router = express.Router();

router.get('/', controller.getAll);

module.exports = router;
