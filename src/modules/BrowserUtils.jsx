const BrowserUtils = {
  ie: function () {
    // return true if Internet Exploder else false
    const ua = window.navigator.userAgent
    const msie = ua.indexOf('MSIE ')
    if (msie > 0) {
      return true
    }
    const trident = ua.indexOf('Trident/')
    if (trident > 0) {
      return true
    }
    const edge = ua.indexOf('Edge/')
    if (edge > 0) {
      return true
    }
    return false
  },

  mobile: function () {
    const checkWidth = 650
    // eslint-disable-next-line no-restricted-globals
    if (screen.width <= checkWidth || window.innerWidth <= checkWidth) {
      return true
    }
    const ua = window.navigator.userAgent
    const iphone = ua.indexOf('iPhone')
    if (iphone > 0) {
      return true
    }
    const ipod = ua.indexOf('iPod')
    if (ipod > 0) {
      return true
    }
    const android = ua.indexOf('android')
    if (android > -1) {
      return true
    }
    return false
  },
}

module.exports = BrowserUtils
