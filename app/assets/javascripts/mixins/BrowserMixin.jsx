BrowserMixin = {
  ie: function() {
    // return true if Internet Exploder else false
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return true;
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        return true;
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       return true;
    }
    return false;
  },

  ios: function() {
    var ua = window.navigator.userAgent;
    var iphone = ua.indexOf('iPhone');
    if(iphone > 0) {
      return true;
    }
    var ipod = ua.indexOf('iPod');
    if(ipod > 0) {
      return true;
    }
    return false;
  },
}

module.exports = BrowserMixin;
