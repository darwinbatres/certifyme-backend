const express = require('express');
const controller = require('../controllers/practices.controller');

const router = express.Router();

// /api/v1/practices
router.get('/', controller.getAll);

module.exports = router;
