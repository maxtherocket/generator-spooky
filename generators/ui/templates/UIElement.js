var SpookyEl = require('spooky-element');

class <%= className %> extends SpookyEl {

    constructor(data){
        this.template = require('<%= depthPath %><%= templatePath %>');
        super(data);
    }

}

module.exports = <%= className %>;