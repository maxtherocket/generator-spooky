var SpookyEl = require('spooky-element');

class <%= className %> extends SpookyEl {

    constructor(){
        this.template = require('<%= depthPath %>templates/<%= dir %><%= className %>.hbs');
        super();
    }

}

module.exports = <%= className %>;