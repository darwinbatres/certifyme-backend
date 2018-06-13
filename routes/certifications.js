const express = require('express');
const controller = require('../controllers/certifications');

const router = express.Router();

router.get('/', controller.getAllCertifications);
router.get('/:id', controller.getOneCertification);
router.post('/', controller.addNewCertification);
router.patch('/:id', controller.updateExistingCertification);
router.delete('/:id', controller.deleteExistingCertification);

module.exports = router;
