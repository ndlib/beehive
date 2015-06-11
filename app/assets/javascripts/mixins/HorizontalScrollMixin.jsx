HorizontalScrollMixin = {
  onWheel: function(event) {
    event.preventDefault();
    var newPosition = 0;
    var scrollSpeed = 30;
    var scrollTolerance = 2;
    var deltaScroll = 0;
    if(Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      deltaScroll = event.deltaX;
    }
    else {
      deltaScroll = event.deltaY;
    }
    if (deltaScroll > scrollTolerance) {
      var maxLeft = $("#showcase-inner").prop("scrollWidth") - $("#showcase-outer").width();
      if($("#showcase-inner").position().left > -maxLeft) {
        newPosition = $("#showcase-inner").position().left - scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"});
      }
      else {
        $("#showcase-inner").css({"left" : -maxLeft + "px"});
      }
    }
    else if (deltaScroll < -scrollTolerance) {
      if ($("#showcase-inner").position().left < 0) {
        newPosition = $("#showcase-inner").position().left + scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"});
      }
      else {
        $("#showcase-inner").css({"left" : "0px"});
      }
    }
  },
}

module.exports = HorizontalScrollMixin;
