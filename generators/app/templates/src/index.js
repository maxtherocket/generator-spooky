require('./styles/index.scss');

const model = require('spooky-model');
// Setup model
model.init(require('./models/site'));

const router = require('spooky-router');
const domReady = require('domready');
const eve = require('dom-events');
const windowSize = require('./utils/window-size');

function init(){
  const container = document.getElementById('spooky-container');
  const body = document.body;

  const routerInit = function(){
    this.add('home', '/', {view:require('./sections/Home/Home')});
  }

  let initialSize = windowSize();
  router.init(container, routerInit, initialSize.w, initialSize.h, true); // Overlap sections

  // RESIZE
  let resize = function(){
    let size = windowSize();
    router.resize(size.w, size.h);
  };
  resize();
  eve.on(window, 'resize', resize);
}

domReady(function(){

  init();

});
