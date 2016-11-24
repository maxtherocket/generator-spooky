var device = require('./device');

module.exports = {

  handleTouch: function( el, down, up, addDownClass=true ){
    var downHandler = function(e){
      if (addDownClass){
        el.addClass('down');
      }
      if (down) down(e);
    }
    var upHandler = function(e){
      if (addDownClass){
        el.removeClass('down');
      }
      if (up) up(e);
    }
    // Down
    if (device.isTouch){
      el.on('touchstart', downHandler);
    } else {
      el.on('mousedown', downHandler);
    }
    // Up
    if (device.isTouch){
      el.on('touchend', upHandler);
    } else {
      el.on('mouseup', upHandler);
      el.on('mouseleave', upHandler);
    }
  },

  handleHover: function(el, hover, out){
    if (device.isTouch) return;
    el.on('mouseenter', (e) => {
      el.addClass('hover');
      if (hover) hover(e);
    });
    el.on('mouseleave', (e) => {
      el.removeClass('hover');
      if (out) out(e);
    });
  }


};
