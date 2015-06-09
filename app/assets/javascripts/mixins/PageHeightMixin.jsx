var minHeight = 160;

var PageHeightMixin = {
  getInitialState: function() {
    return {
      height: this.getHeight(),
    };
  },

  getHeight: function() {
    var top = ($('#banner-wrapper').outerHeight() || 0);
    var footerHeight = ($('#footer').outerHeight() || 0);
    var height = $(window).height() - top - footerHeight;
    if (height < minHeight) {
      height = minHeight;
    }
    return height;
  },

  handleResize: function() {
    this.setState({
      height: this.getHeight(),
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
}

module.exports = PageHeightMixin;
