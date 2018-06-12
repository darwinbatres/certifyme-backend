const practices = require('./practices');
const users = require('./users');

module.exports = (app) => {
  app.use('/api/v1/practices', practices);
  app.use('/api/v1/users', users);

  //   catch all route for non-existing requests
  app.all('*', (req, res) => {
    res.status(404).json({
      response: {
        error: 'There is no route associated with this request',
      },
    });
  });
};
