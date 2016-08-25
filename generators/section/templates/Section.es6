require('./<%= className %>.scss');

var SpookyEl = require('spooky-element');
var yo = require('yo-yo');

class <%= className %> extends SpookyEl {

  constructor(data){
    var el = yo`<div class="section-<%= dashedName %>"></div>`;
    super(el);
  }

}

module.exports = <%= className %>;
