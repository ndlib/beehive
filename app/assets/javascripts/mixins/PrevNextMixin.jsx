 var PrevNextMixin = {
  propTypes: {
    id: React.PropTypes.string.isRequired,
    offsetTop: React.PropTypes.number,
  },

  buttonStyles: function() {
    if (this.props.offsetTop) {
      return {
        top: this.props.offsetTop + 'px',
      };
    } else {
      return {};
    }
  },

  modalID: function() {
    return "#modal-" + this.props.id;
  },

  clickAction: function(event) {
    window.location.hash = "modal-" + this.props.id;
    event.preventDefault();
  },
}

module.exports = PrevNextMixin;
