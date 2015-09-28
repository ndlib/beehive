 var PrevNextMixin = {
  propTypes: {
    url: React.PropTypes.string.isRequired,
    offsetTop: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      offsetTop: window.innerHeight/2,
    };
  },

  buttonStyles: function() {
    if (this.props.offsetTop) {
      return {
        top: this.props.offsetTop + 'px',
        zIndex: 1,
      };
    } else {
      return {};
    }
  },

  modalID: function() {
    return this.props.id;
  },

  clickAction: function(event) {
    event.preventDefault();
    var id = this.props.url.split("/").pop();
    window.location.hash = id;
    this.loadRemoteItem(this.props.url);
  },
}

module.exports = PrevNextMixin;
