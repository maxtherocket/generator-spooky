var config = {};

if (process.env.NODE_ENV == 'dev'){
  config = require('../config/dev');
} else if (process.env.NODE_ENV == 'dist'){
  config = require('../config/dist');
}

module.exports = config;
