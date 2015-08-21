var SpookyEl = require('spooky-element');

class <%= className %> extends SpookyEl {

    constructor(data){
        super(require('./<%= className %>.hbs'), data);
    }

}

module.exports = <%= className %>;