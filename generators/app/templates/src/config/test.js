'use strict';

import baseConfig from './base';
import _ from 'lodash';

let config = {
  env: 'test'
};

module.exports = _.assign({}, baseConfig, config);
