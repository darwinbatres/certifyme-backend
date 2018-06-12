const express = require('express');

const routes = require('./routes');
const { port } = require('./configuration');
const database = require('./configuration/db');
const middleware = require('./middleware');
const logger = require('./utils/logger');

const app = express();

middleware(app);
routes(app);

try {
  database();
  
  app.listen(port, () => {
    logger.info(`app listening on ports: ${port}`);
  });
} catch (error) {
  logger.info('connection to the db failed');
  logger.info(error);
  process.exit(1);
}
