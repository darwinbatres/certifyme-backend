const practices = require('./practices');
const users = require('./users');
const certifications = require('./certifications');

module.exports = (app) => {
  app.use('/api/v1/practices', practices);
  app.use('/api/v1/users', users);
  app.use('/api/v1/certifications', certifications);

  //   catch all route for non-existing requests
  app.all('*', (req, res) => {
    res.status(404).json({
      response: {
        error: 'There is no route associated with this request',
      },
    });
  });
};
