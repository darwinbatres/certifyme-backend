const express = require('express');
const controller = require('../controllers/coaching.controller');

const router = express.Router();

// /api/v1/coach-practice
router.get('/', controller.getAllRelations);
router.post('/', controller.addNewRelation);
router.patch('/:id', controller.updateExistingRelation);
router.delete('/:id', controller.deleteExistingRelation);
router.get('/mycoach/:coacheeId', controller.getMyCoach);
router.get('/mycoachees/:coachId', controller.getMyCoachees);

module.exports = router;
