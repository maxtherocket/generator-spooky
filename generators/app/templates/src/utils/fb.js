var Promise = require('bluebird');
var waitUntil = require('wait-until');
var config = require('./config');
var customError = require('./custom-error');
var domready = require('domready');

var fbInitData = config.fbInitData;

domready(() => {
  // Append FB script
  var script = document.createElement("script");
  script.innerHTML = `(function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));`;
  document.body.appendChild(script);
});

var fbInitialized = false;
window.fbAsyncInit = function() {
  window.FB.init(fbInitData);
  fbInitialized = true;
};

module.exports = {

  getFB: function(){
    return new Promise((resolve, reject) => {
      if (fbInitialized){
        resolve(window.FB)
      } else {
        waitUntil(200, 75, function condition() {
            return fbInitialized;
        }, function done(result) {
          if (result){
            resolve(window.FB);
          } else {
            reject(new customError('Could not initialize FB'));
          }
        });
      }
    })
  },

  getStatus: function(){
    return new Promise((resolve, reject) => {
      this.getFB().then((fb) => {
        fb.getLoginStatus(function(response) {
          resolve(response);
        });
      });
    });
  }

};
