var Browser = {
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

  mobile: function() {
    var checkWidth = 650;
    if(screen.width <= checkWidth || window.innerWidth <= checkWidth){
      return true;
    }
    var ua = window.navigator.userAgent;
    var iphone = ua.indexOf('iPhone');
    if(iphone > 0) {
      return true;
    }
    var ipod = ua.indexOf('iPod');
    if(ipod > 0) {
      return true;
    }
    var android = ua.indexOf('android');
    if(android > -1) {
      return true;
    }
    return false;
  },

  touchSupport: function() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
    if (msTouchEnabled || generalTouchEnabled) {
        return true;
    }
    return false;
  },
}

module.exports = Browser;
