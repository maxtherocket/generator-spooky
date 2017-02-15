'use strict';

import baseConfig from './base';
import _ from 'lodash';

let config = {
  env: 'dev'
};

module.exports = _.assign({}, baseConfig, config);
