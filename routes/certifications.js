const express = require('express');
const controller = require('../controllers/certifications');

const router = express.Router();

// /api/v1/certifications
router.get('/', controller.getAllCertifications); // done
router.get('/:id', controller.getOneCertification);
router.post('/', controller.addNewCertification); // done
router.patch('/:id', controller.updateExistingCertification);
router.delete('/:id', controller.deleteExistingCertification);

module.exports = router;
