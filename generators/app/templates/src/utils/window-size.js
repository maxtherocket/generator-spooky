module.exports = () => {

  var w = window,
      d = document,
      e = d.documentElement,
      g = document.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return {w:x, h:y};

};
