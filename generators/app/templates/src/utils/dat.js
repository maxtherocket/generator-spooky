var dat = require('dat.gui');

module.exports = {

  init: function(){
    this.instance = new dat.GUI();
  },

  instance: null,

  add: function(...params){
    if (this.instance){
      this.instance.add(...params);
      return this.instance;
    }
  }

};
