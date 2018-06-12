// initializing environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // eslint-disable-line
}

module.exports = {
  port: process.env.PORT || 3000,
  dbDialect: process.env.DB_DIALECT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
};
