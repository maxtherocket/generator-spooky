var SpookyEl = require('spooky-element');

class <%= className %> extends SpookyEl {

    constructor(data){
        this.template = require('<%= depthPath %>templates/<%= dir %><%= className %>.hbs');
        super(data);
    }

}

module.exports = <%= className %>;