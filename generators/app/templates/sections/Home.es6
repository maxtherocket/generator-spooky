var SpookyEl = require('spooky-element');

class Home extends SpookyEl {

    constructor(data){
        this.template = require('../templates/sections/Home.hbs');
        super(data);
    }

}

module.exports = Home;