var Router = require('spooky-router');
var domReady = require('domready');

domReady(function(){

    var container = document.getElementById('spooky-container');

    var routerInit = function(){
        this.add('home', '/', {view:require('./sections/Home')});
    }

    var model = require('./models/site');

    var router = new Router(container, routerInit, model);
    router.init();

});
