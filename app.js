const express = require('express');
const compression = require('compression');
const routes = require('./routes');
const { port } = require('./configuration');
const database = require('./configuration/db');
const middleware = require('./middleware');
const logger = require('./utils/logger');

const app = express();
app.use(compression());
middleware(app);
routes(app);

try {
  database
    .checkConnection()
    .then(() => {
      app.listen(port, () => {
        logger.info(`app listening on ports: ${port}`);
      });
    })
    .catch((err) => {
      throw err;
    });
} catch (error) {
  logger.error('connection to the db failed');
  logger.error(error);
  process.exit(1);
}
