const practices = require('./practices');
const users = require('./users');
const certifications = require('./certifications');
const coaching = require('./coaching');

module.exports = (app) => {
  app.use('/api/v1/practices', practices);
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
