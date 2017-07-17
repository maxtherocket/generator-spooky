module.exports = {

  trackEvent: function(cat, action, label, val){
    if (ga){
      ga('send', 'event', cat, action, label, val);
    }
  },

  trackPage: function(page){
    if (ga){
      console.log('pageview:', page);
      ga('send', 'pageview', page);
    }
  }

};
