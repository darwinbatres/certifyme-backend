const logger = require('../utils/logger');
const Coaching = require('../models/Coaching');
const { getUserInformation } = require('./users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getCoachees = async ({ coachId }) => {
  const coachees = await Coaching.findAll({
    attributes: ['coacheeId'],
    where: { 
      coachId, 
      // coacheeId: {
      //   [Op.or]: {
      //     [Op.ne]: null,
      //     [Op.ne]: '',
      //   }
      // } 
    }
  });
  return coachees.length > 0 ? coachees : [];
}

const getEmbeddedCoachees = async ({ coachees }) => {
  const results = coachees.map(async (tempCoachee) => {
    const coachee = await getUserInformation(tempCoachee.coacheeId);
    return ({
      coachee,
    })
  });
  return Promise.all(results)
}

const getUsersInformation = async ({ relationsIds }) => {
  const usersInfo = relationsIds.map(async relation => {
    const coach = await getUserInformation(relation.coachId);
    let coachees = [];
    if(relation.coachees.length > 0) {
      coachees = await getEmbeddedCoachees({ coachees: relation.coachees });
    }
    return ({
      coach,
      coachees
    });
  });
  return Promise.all(usersInfo)
};

const getRelations = async ({ coaches }) => {
  const relations = coaches.map(async ({ coachId }) => {
    const coachees = await getCoachees({ coachId });
    return ({
      coachId,
      coachees
    })
  });
  return Promise.all(relations);
}

module.exports.getAllRelations =  async (req, res) => {
  try {
    const coaches = await Coaching.findAll({
      attributes: ['coachId'],
      group: 'coachId'
    });
    
    if (coaches.length > 0) {
      const relationsIds = await getRelations({ coaches });
      
      const relations = await getUsersInformation({ relationsIds });
      
      res.json({ response: {
        data: {
          relations
        }
      } });
    } else {
      res.status(404).json({
        response: {
          data: {
            message: 'No relations found',
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
              'error found while retrieving relations, check the logs to see what the error is about',
          },
        ],
      },
    });
  }
};

module.exports.addNewRelation = async (req, res) => {
  const { coachId, coacheeId } = req.body;
  if (!parseInt(coachId, 10) || !parseInt(coacheeId, 10)) {
    res.status(400).json({
      response: {
        errors: [
          {
            message:
              'both coachId and coacheeId are required values and both must be numeric values',
          },
        ],
      },
    });
  } else {
    try {
      await Coaching.create({
       coachId, coacheeId
      });
      res.json({
        response: {
          data: {
            message: 'Relation created successfully!',
          },
        },
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      response: {
        errors: [
          {
            message: 'there was an error while creating this relation',
          },
        ],
      },
    });
  }
  }
}

module.exports.getMyCoachees =  async (req, res) => {
  const { coachId } = req.params;
  
  if (!parseInt(coachId, 10)) {
    res.status(400).json({
      response: {
        errors: [
          {
            message:
              'coachId is a required value and it must be numeric values',
          },
        ],
      },
    });
  } else {
    try {
      const coachees = await getCoachees({ coachId });
    
      if(coachees.length > 0) {
        const coacheesResults = await getEmbeddedCoachees({ coachees });
        res.json({ coachees: coacheesResults})
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
                'error found while retrieving certifications, check the logs to see what the error is about',
            },
          ],
        },
      });
    }
  }
  
  
  
  
  
  
  // try {
  //   const certifications = await Certification.findAll({
  //     attributes: defaultFields,
  //   });
  //   if (certifications.length > 0) {
  //     res.json({
  //       response: {
  //         data: {
  //           certifications,
  //         },
  //       },
  //     });
  //   } else {
  //     res.status(404).json({
  //       response: {
  //         data: {
  //           message: 'No certifications found',
  //         },
  //       },
  //     });
  //   }
  // } catch (err) {
  //   logger.error(err);
  //   res.status(500).json({
  //     response: {
  //       errors: [
  //         {
  //           message:
  //             'error found while retrieving certifications, check the logs to see what the error is about',
  //         },
  //       ],
  //     },
  //   });
  // }
};

// const logger = require('../utils/logger');
// const Certification = require('../models/Certification');

// const defaultFields = ['id', 'name', 'practice', 'version', 'expired', 'createdAt', 'updatedAt'];

// const findById = async ({ id, res }) => {
//   if (!parseInt(id, 10)) {
//     res.status(400).json({
//       response: {
//         errors: [
//           {
//             message:
//               'Invalid Id passed as parameter, number as certificationId expected',
//           },
//         ],
//       },
//     });
//   } else {
//     try {
//       const certification = await Certification.findById(id, { attributes: defaultFields });
//       if (certification) {
//         return certification;
//       }
//       res.status(404).json({
//         response: {
//           data: {
//             message: 'No certification found',
//           },
//         },
//       });
//     } catch (err) {
//       logger.error(err);
//       res.status(500).json({
//         response: {
//           errors: [
//             {
//               message:
//                 'There was an error while trying to retrive information for this certification',
//             },
//           ],
//         },
//       });
//     }
//   }
// };

// module.exports.getAllCertifications =  async (req, res) => {
//   try {
//     const certifications = await Certification.findAll({
//       attributes: defaultFields,
//     });
//     if (certifications.length > 0) {
//       res.json({
//         response: {
//           data: {
//             certifications,
//           },
//         },
//       });
//     } else {
//       res.status(404).json({
//         response: {
//           data: {
//             message: 'No certifications found',
//           },
//         },
//       });
//     }
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({
//       response: {
//         errors: [
//           {
//             message:
//               'error found while retrieving certifications, check the logs to see what the error is about',
//           },
//         ],
//       },
//     });
//   }
// };

// module.exports.getOneCertification = async (req, res) => {
//   const { id } = req.params;
//   const certification = await findById({ id, res });
//   if (certification) {
//     res.json({
//       response: {
//         data: {
//           certification,
//         },
//       },
//     });
//   }
// };

// module.exports.addNewCertification = async (req, res) => {
//   // TO-DO
//   // add validation for required fields
//   const { name, addedBy, practice, version } = req.body;
//   try {
//     const newCertification = await Certification.create({
//       name,
//       addedBy,
//       practice,
//       version
//     });
//     res.json({
//       response: {
//         data: {
//           message: 'Certification created successfully!',
//           certification: {
//             id: newCertification.id,
//             name,
//             practice,
//             version
//           },
//         },
//       },
//     });
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({
//       response: {
//         errors: [
//           {
//             message: 'there was an error while creating this certification',
//           },
//         ],
//       },
//     });
//   }
// };

// module.exports.updateExistingCertification = async (req, res) => {
// //   // TO-DO
// //   // add validation for required fields
//   const { id } = req.params;
//   const certification = await findById({ id, res });
//   if (certification) {
//     const { name, addedBy, practice, version, expired } = req.body;
//     try {
//       await Certification.update(
//         {
//           name, addedBy, practice, version, expired
//         },
//         { where: { id } },
//       );
//       res.json({
//         response: {
//           data: {
//             message: 'Certification updated successfully',
//           },
//         },
//       });
//     } catch (err) {
//       logger.error(err);
//       res.status(500).json({
//         response: {
//           errors: [
//             {
//               message: 'there was an error while updating this certification',
//             },
//           ],
//         },
//       });
//     }
//   }
// };

// module.exports.deleteExistingCertification = async (req, res) => {
//   const { id } = req.params;
//   const certification = await findById({ id, res });
//   if (certification) {
//     try {
//       await Certification.destroy({
//         where: {
//           id,
//         },
//       });
//       res.json({
//         response: {
//           data: {
//             message: 'Certification deleted successfully',
//           },
//         },
//       });
//     } catch (err) {
//       logger.error(err);
//       res.status(500).json({
//         response: {
//           errors: [
//             {
//               message: 'there was an error while deleting this certification',
//             },
//           ],
//         },
//       });
//     }
//   }
// };
