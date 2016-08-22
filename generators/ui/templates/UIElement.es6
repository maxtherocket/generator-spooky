require('./<%= className %>.scss');

var SpookyEl = require('spooky-element');
var yo = require('yo-yo');

class <%= className %> extends SpookyEl {

  constructor(data){
    var el = yo`
    <div class="ui-<%= dashedName %>">
    </div>`;
    super(el, data);
  }

}

module.exports = <%= className %>;
