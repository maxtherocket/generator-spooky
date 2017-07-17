require('./<%= className %>.scss');

const SpookyEl = require('spooky-element');
const yo = require('yo-yo');

class <%= className %> extends SpookyEl {

  constructor(data){
    super();
    this.view = yo`<div class="section-<%= dashedName %>"></div>`;
  }

}

module.exports = <%= className %>;
