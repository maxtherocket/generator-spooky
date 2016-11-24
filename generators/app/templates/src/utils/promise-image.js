var Promise = require('bluebird');

module.exports = function(src, guarantee=false){

  var image = new Image();

  //src = assetUrl(src);
  var resetImage = function(){
    image.onload = null;
    image.onerror = null;
  }

  return new Promise((resolve, reject) => {
    image.onload = function(){
      resetImage();
      resolve(image);
    }
    image.onerror = function(){
      resetImage();
      if (guarantee){
        reject(image);
      } else {
        resolve(image);
      }
    }
    image.src = src;
    if (image.complete) {
      resetImage();
      resolve(image);
    }
  });

}
