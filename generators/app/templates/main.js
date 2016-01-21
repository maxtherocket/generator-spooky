var model = require('spooky-model');
// Setup model
model.init(require('./models/site'));

var router = require('./router-main');
var domReady = require('domready');
var eve = require('dom-events');

domReady(function(){

  var container = document.getElementById('spooky-container');
  var body = document.body;

  var routerInit = function(){
      this.add('home', '/', {view:require('./sections/Home/Home')});
  }

  router.init(container, routerInit);

  // RESIZE
  var resize = function(){
      var w = window.innerWidth;
      var h = window.innerHeight;
      router.resize(w,h);
  };
  resize();
  eve.on(window, 'resize', resize);

});
