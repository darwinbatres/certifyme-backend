const swaggerUI = require('swagger-ui-express');

// const practices = require('./practices');
const users = require('./users');
const certifications = require('./certifications');
const coaching = require('./coaching');

const swaggerDocument = require('../configuration/swagger.json');

module.exports = (app) => {
  // setting up documentation
  const options = {
    swaggerOptions: {
      explorer: true,
      validatorUrl: null,
      docExpansion: ['none'],
    },
  };
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

  // general routes
  // app.use('/api/v1/practices', practices);
  app.use('/api/v1/users', users);
  app.use('/api/v1/certifications', certifications);
  app.use('/api/v1/coach-practice', coaching);

  //   catch all route for non-existing requests
  app.all('*', (req, res) => {
    res.status(404).json({
      response: {
        error: 'There is no route associated with this request',
      },
    });
  });
};
