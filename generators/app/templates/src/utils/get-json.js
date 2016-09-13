var xhr = require('xhr');
var Promise = require('bluebird');
var errors = require('./errors');
var urlParamsHelper = require('url-params-helper');

module.exports = function(url, data){

  data = data || {};
  var params = urlParamsHelper.buildQueryString(data);

  var promise = new Promise((resolve, reject) => {

    xhr({
      uri: url + ((params)?'?'+params:''),
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      }
    }, function (err, resp, body) {
      if (err){
        reject( new errors.Error({message:'Failed to load JSON from '+url}) );
        return;
      }
      var json = JSON.parse(body);
      resolve(json);
    });

  }).catch( require('./catch-promise') );

  return promise;

};
