const logger = require('../utils/logger');
const Certification = require('../models/Certification.model');

const defaultFields = ['id', 'name', 'practice', 'version', 'expired', 'createdAt', 'updatedAt'];

const findById = async ({ id, res }) => {
  if (!parseInt(id, 10)) {
    res.status(400).json({
      message: 'Invalid Id passed as parameter, number as certificationId expected',
    });
  } else {
    try {
      const certification = await Certification.findById(id, { attributes: defaultFields });
      if (certification) {
        return certification;
      }
      res.status(404).json({
        message: 'No certification found',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'There was an error while trying to retrive information for this certification',
      });
    }
  }
};

// GET => /api/v1/certifications/:id
module.exports.getOneCertification = async (req, res) => {
  const { id } = req.params;
  const certification = await findById({ id, res });
  if (certification) {
    res.json({
      certification,
    });
  }
};

// GET => /api/v1/certifications
module.exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      attributes: defaultFields,
    });
    if (certifications.length > 0) {
      res.json({
        certifications,
      });
    } else {
      res.status(404).json({
        message: 'No certifications found',
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message:
        'error found while retrieving certifications, check the logs to see what the error is about',
    });
  }
};

// POST => /api/v1/certifications
module.exports.addNewCertification = async (req, res) => {
  // TO-DO
  // add validation for required fields
  const {
    name, addedBy, practice, version,
  } = req.body;
  try {
    const newCertification = await Certification.create({
      name,
      addedBy,
      practice,
      version,
    });
    res.status(201).json({
      certification: {
        id: newCertification.id,
        name,
        practice,
        version,
        expired: newCertification.expired,
        createdAt: newCertification.createdAt,
        updatedAt: newCertification.updatedAt,
      },
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message: 'there was an error while creating this certification',
    });
  }
};

// PATCH => /api/v1/certifications/:id
module.exports.updateExistingCertification = async (req, res) => {
  // TO-DO
  // add validation for required fields
  const { id } = req.params;
  const certification = await findById({ id, res });
  if (certification) {
    const {
      name, addedBy, practice, version, expired,
    } = req.body;
    try {
      await Certification.update(
        {
          name,
          addedBy,
          practice,
          version,
          expired,
        },
        { where: { id } },
      );
      res.json({
        message: 'Certification updated successfully',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while updating this certification',
      });
    }
  }
};

// DELETE => /api/v1/certifications/:id
module.exports.deleteExistingCertification = async (req, res) => {
  const { id } = req.params;
  const certification = await findById({ id, res });
  if (certification) {
    try {
      await Certification.destroy({
        where: {
          id,
        },
      });
      res.json({
        message: 'Certification deleted successfully',
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: 'there was an error while deleting this certification',
      });
    }
  }
};
