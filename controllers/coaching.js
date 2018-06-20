const logger = require('../utils/logger');
const Coaching = require('../models/Coaching');
const { getUserInformation } = require('./users');
// const Sequelize = require('sequelize');

// const { Op } = Sequelize;

const getCoachees = async ({ coachId }) => {
  const coachees = await Coaching.findAll({
    attributes: ['coacheeId', 'id'],
    where: {
      coachId,
      // coacheeId: {
      //   [Op.or]: {
      //     [Op.ne]: null,
      //     [Op.ne]: '',
      //   }
      // }
    },
  });
  return coachees.length > 0 ? coachees : [];
};

const getEmbeddedCoachees = async ({ coachees }) => {
  const results = coachees.map(async (tempCoachee) => {
    const coachee = await getUserInformation(tempCoachee.coacheeId);
    return {
      coachee,
      relationId: tempCoachee.id,
    };
  });
  return Promise.all(results);
};

const getUsersInformation = async ({ relationsIds }) => {
  const usersInfo = relationsIds.map(async (relation) => {
    const coach = await getUserInformation(relation.coachId);
    let coachees = [];
    if (relation.coachees.length > 0) {
      coachees = await getEmbeddedCoachees({ coachees: relation.coachees });
    }
    return {
      coach,
      coachees,
    };
  });
  return Promise.all(usersInfo);
};

const getRelations = async ({ coaches }) => {
  const relations = coaches.map(async ({ coachId }) => {
    const coachees = await getCoachees({ coachId });
    return {
      coachId,
      coachees,
    };
  });
  return Promise.all(relations);
};

// GET => /api/v1/coach-practice
module.exports.getAllRelations = async (req, res) => {
  try {
    const coaches = await Coaching.findAll({
      attributes: ['coachId'],
      group: 'coachId',
    });

    if (coaches.length > 0) {
      const relationsIds = await getRelations({ coaches });

      const relations = await getUsersInformation({ relationsIds });

      res.json({
        relations,
      });
    } else {
      res.status(404).json({
        message: 'No relations found',
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message: 'error found while retrieving relations, check the logs to see what the error is about',
    });
  }
};

// POST => /api/v1/coach-practice
module.exports.addNewRelation = async (req, res) => {
  const { coachId, coacheeId } = req.body;
  if (!parseInt(coachId, 10) || !parseInt(coacheeId, 10)) {
    res.status(400).json({
      message: 'both coachId and coacheeId are required values and both must be numeric values',
    });
  } else {
    try {
      await Coaching.create({
        coachId,
        coacheeId,
      });
      res.status(201).json({
        message: 'Relation created successfully!',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while creating this relation',
      });
    }
  }
};

module.exports.getMyCoach = async (req, res) => {
  const { coacheeId } = req.params;
  if (!parseInt(coacheeId, 10)) {
    res.status(400).json({
      response: {
        errors: [
          {
            message: 'coacheeId is a required value and it must be numeric value',
          },
        ],
      },
    });
  } else {
    try {
      const coach = await Coaching.findOne({
        attributes: ['coachId'],
        where: {
          coacheeId,
        },
      });

      if (coach) {
        const coachInfo = await getUserInformation(coach.coachId);
        res.json({
          response: {
            data: {
              coach: coachInfo,
            },
          },
        });
      } else {
        res.status(404).json({
          response: {
            data: {
              message: 'No coach information found',
            },
          },
        });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        response: {
          errors: [
            {
              message:
                'error found while retrieving coach information, check the logs to see what the error is about',
            },
          ],
        },
      });
    }
  }
};

module.exports.getMyCoachees = async (req, res) => {
  const { coachId } = req.params;

  if (!parseInt(coachId, 10)) {
    res.status(400).json({
      response: {
        errors: [
          {
            message: 'coachId is a required value and it must be numeric value',
          },
        ],
      },
    });
  } else {
    try {
      const coachees = await getCoachees({ coachId });

      if (coachees.length > 0) {
        const coacheesResults = await getEmbeddedCoachees({ coachees });
        res.json({
          response: {
            data: {
              coachees: coacheesResults,
            },
          },
        });
      } else {
        res.status(404).json({
          response: {
            data: {
              message: 'No coachees found',
            },
          },
        });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        response: {
          errors: [
            {
              message:
                'error found while retrieving coachees, check the logs to see what the error is about',
            },
          ],
        },
      });
    }
  }
};

// PATCH => /api/v1/coach-practice/:id
module.exports.updateExistingRelation = async (req, res) => {
  const { id } = req.params;
  const { coachId, coacheeId } = req.body;
  if (!parseInt(coachId, 10) || !parseInt(coacheeId, 10) || !parseInt(id, 10)) {
    res.status(400).json({
      message: 'coachId, coacheeId and relationId are required values and all must be numeric values',
    });
  } else {
    try {
      const relation = await Coaching.findById(id);
      if (relation) {
        await Coaching.update(
          {
            coachId,
            coacheeId,
          },
          { where: { id } },
        );
        res.json({
          message: 'Relation updated successfully',
        });
      } else {
        res.status(404).json({
          message: 'No relation found',
        });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while creating this relation',
      });
    }
  }
};

module.exports.deleteExistingRelation = async (req, res) => {
  const { id } = req.params;
  if (!parseInt(id, 10)) {
    res.status(400).json({
      response: {
        errors: [
          {
            message: 'relationId is a required value and it must be numeric value',
          },
        ],
      },
    });
  } else {
    try {
      const relation = await Coaching.findById(id);

      if (relation) {
        await Coaching.destroy({
          where: {
            id,
          },
        });
        res.json({
          response: {
            data: {
              message: 'Relation deleted successfully',
            },
          },
        });
      } else {
        res.status(404).json({
          response: {
            data: {
              message: 'No relation found',
            },
          },
        });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        response: {
          errors: [
            {
              message:
                'error found while retrieving relation information, check the logs to see what the error is about',
            },
          ],
        },
      });
    }
  }
};
