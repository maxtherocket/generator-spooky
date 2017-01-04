var domEvents = require('dom-events');
var eventEmitter = require('event-emitter');
var device = require('./device');

module.exports = {

  ee: new eventEmitter({}),

  init: function(){
    this.width = 0;
    this.height = 0;
    this.halfWidth = 0;
    this.halfHeight = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.xOffsetSmooth = 0;
    this.yOffsetSmooth = 0;
    //if (device.isTouch) return;
    domEvents.on(document, 'mousemove', (e) => {
      var x = e.clientX;
      var y = e.clientY;
      if (x >= this.halfWidth){
        this.xOffset = -(x - this.halfWidth)/this.halfWidth;
      } else if (x < this.halfWidth){
        this.xOffset = (1 - x/this.halfWidth);
      }
      if (y >= this.halfHeight){
        this.yOffset = -(y - this.halfHeight)/this.halfHeight;
      } else if (y < this.halfHeight){
        this.yOffset = (1 - y/this.halfHeight);
      }
      this.ee.emit('move', this);
      gsap.to(this, 2.6, {xOffsetSmooth:this.xOffset, yOffsetSmooth:this.yOffset, overwrite:'all', ease:Power2.easeOut, onUpdate:(arg) => {
          this.ee.emit('update', this);
      }});
    });
  },

  resize: function(w,h){
    this.width = w;
    this.height = h;
    this.halfWidth = this.width/2;
    this.halfHeight = this.height/2;
  }


};
