var SpookyEl = require('spooky-element');

class Home extends SpookyEl {

    constructor(){
        this.template = require('../templates/Home.hbs');
        super();
    }

}

module.exports = Home;