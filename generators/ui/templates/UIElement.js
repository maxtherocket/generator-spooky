var SpookyEl = require('spooky-element');
var Class = require('js-oop');

var <%= className %> = new Class({

  Extends: SpookyEl,

  initialize: function(data){
    this.template = require('./<%= className %>.hbs');
    SpookyEl.call(this, data);
  }

});

module.exports = <%= className %>;
