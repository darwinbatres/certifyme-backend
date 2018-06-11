const colors = require('colors');

module.exports = {
  info: (message) => {
    console.log(colors.cyan(message)); // eslint-disable-line
  },
  error: (message) => {
    console.log(colors.red(message)); // eslint-disable-line
  },
};
