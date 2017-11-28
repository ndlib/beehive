var PrevNext = {
  buttonStyles: function (offsetTop, bgColor) {
    if (offsetTop) {
      return {
        top: offsetTop + 'px',
        zIndex: 100,
        backgroundColor: bgColor,
        color: '#fff',
      }
    } else {
      return {
        backgroundColor: bgColor,
        color: '#fff',
      }
    }
  },
}

module.exports = PrevNext
