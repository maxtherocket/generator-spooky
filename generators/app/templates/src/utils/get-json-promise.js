var xhr = require("xhr")
var Promise = require('bluebird');
var urlParamsHelper = require('url-params-helper');
var _ = require('lodash');

module.exports = function(url, data, method='GET', cacheBust=true){

  data = data || {};

  if (cacheBust){
    data['_'] = (new Date().getTime());
  }

  var params = urlParamsHelper.buildQueryString(data);

  return new Promise((resolve, reject) => {

    xhr({
        uri: url + ((params)?'?'+params:''),
        method: method,
        headers: {
          "Content-Type": "application/json"
        }
    }, function (err, resp, body) {
      var json = body;
      if (_.isString(json)){
        json = JSON.parse(body);
      }
      resolve(json);
    });

  });

};
