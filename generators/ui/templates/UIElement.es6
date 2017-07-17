require('./<%= className %>.scss');

const SpookyEl = require('spooky-element');
const yo = require('yo-yo');

class <%= className %> extends SpookyEl {

  constructor(data){
    super();
    this.view = yo`
    <div class="ui-<%= dashedName %>">
    </div>`;
  }

}

module.exports = <%= className %>;
