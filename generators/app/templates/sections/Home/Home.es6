var SpookyEl = require('spooky-element');

class Home extends SpookyEl {

    constructor(data){
        super(require('./Home.hbs'), data);
    }

}

module.exports = Home;