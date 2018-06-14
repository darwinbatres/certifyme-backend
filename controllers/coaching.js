const logger = require('../utils/logger');
const Coaching = require('../models/Coaching');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getCoachees = async ({ coachId }) => {
  const coachees = await Coaching.findAll({
    attributes: ['coacheeId'],
    where: { coachId, coacheeId: {
      [Op.ne]: null
    } }
  });
  if(coachees.length > 0) {
    return coachees;
  }
  return [];
}

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
      const relations = await getRelations({ coaches });
      res.json({ message: 'it all eneded', relations });
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
  // TO-DO
  // add validation for required fields
  const { coachId, coacheeId } = req.body;
    try {
    const newRelation = await Coaching.create({
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