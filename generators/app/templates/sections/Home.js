var SpookyEl = require('spooky-element');

class Home extends SpookyEl {

    constructor(){
        this.template = require('../templates/sections/Home.hbs');
        super();
    }

}

module.exports = Home;