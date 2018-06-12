const practices = require('./practices');

module.exports = (app) => {
  app.use('/api/v1/practices', practices);

  //   catch all route for non-existing requests
  app.all('*', (req, res) => {
    res.status(404).json({
      response: {
        error: 'There is no route associated with this request',
      },
    });
  });
};
