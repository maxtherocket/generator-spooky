var Promise = require('bluebird');
var FFO = require('fontfaceobserver/fontfaceobserver');

module.exports = function(){

  let families = [
    {
      family: 'Glence-Black',
      weight: 400
    },
    {
      family: 'Glence-Regular',
      weight: 400
    },
    {
      family: 'Roboto Mono',
      weight: 400
    },
    {
      family: 'Roboto Mono',
      weight: 300
    },
    {
      family: 'Roboto',
      weight: 400
    },
    {
      family: 'Roboto',
      weight: 300
    }
  ];

  let promises = families.map((f) => {
    let font = new FFO(f.family, {weight: f.weight});
    font.load(null, 4000);
  });

  return Promise.all(promises);
};
