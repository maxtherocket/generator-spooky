var xhr = require('xhr');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(url, data={}, method='POST'){

  return new Promise((resolve, reject) => {

    var params = {
      uri: url,
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (_.isString(data)){
      params.body = data;
    } else if (_.isObject(data)){
      params.json = data;
    }

    xhr(params, function (err, resp, body) {
      var json = body;
      if (_.isString(json)){
        json = JSON.parse(body);
      }
      resolve(json);
    });

  });

};
