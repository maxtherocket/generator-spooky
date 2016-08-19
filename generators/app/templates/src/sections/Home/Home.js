require('./Home.scss');

var SpookyEl = require('spooky-element');
var yo = require('yo-yo');

class Home extends SpookyEl {

  constructor(data){
    var el = yo`<div class="section-home"></div>`;
    super(el);
  }

}

module.exports = Home;
