const express = require('express');
const routes = require('./routes');

const {
  port,
} = require('./configuration');
const middleware = require('./middleware');
const logger = require('./utils/logger');

const app = express();

middleware(app);
routes(app);

app.listen(port, () => {
  logger.info(`app listening on port: ${port}`);
});
