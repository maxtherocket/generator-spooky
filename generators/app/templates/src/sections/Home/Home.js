require('./Home.scss');

const SpookyEl = require('spooky-element');
const yo = require('yo-yo');

class Home extends SpookyEl {

  constructor(data){
    let el = yo`<div class="section-home"></div>`;
    super(el);
  }

}

module.exports = Home;
