var Promise = require('bluebird');
var eventEmitter = require('event-emitter');
var _ = require('lodash');

module.exports = function(promises){

  var ee = new eventEmitter({});

  var loadCount = 0;
  var progress = 0;
  var promise = Promise.map(promises, (promise) => {
    loadCount++;
    progress = loadCount/promises.length;
    ee.emit('progress', progress);
    return promise;
  }).then(() => {
    ee.emit('complete');
  });

  _.defer((arg) => {
    // Emit initial progress
    ee.emit('progress', Math.max(progress,0));
  });

  return ee;

}
