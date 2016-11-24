require('./styles/index.scss');

var model = require('spooky-model');
// Setup model
model.init(require('./models/site'));

var router = require('./router-main');
var domReady = require('domready');
var eve = require('dom-events');
var windowSize = require('./utils/window-size');

domReady(function(){

  var container = document.getElementById('spooky-container');
  var body = document.body;

  var routerInit = function(){
    this.add('home', '/', {view:require('./sections/Home/Home')});
  }

  var initialSize = windowSize();
  router.init(container, routerInit, initialSize.w, initialSize.h, true);

  // RESIZE
  var resize = function(){
    var size = windowSize();
    router.resize(size.w, size.h);
  };
  resize();
  eve.on(window, 'resize', resize);

});
