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
        zIndex: 100,
        backgroundColor: this.getCurrentPallette().accent3Color,
      };
    } else {
      return {
        backgroundColor: this.getCurrentPallette().accent3Color,
      };
    }
  },

  modalID: function() {
    return this.props.id;
  },

  clickAction: function(event) {
    event.preventDefault();
    var id = this.props.url.split("/").pop();
    window.location.hash = id;
    if(this.props.url.indexOf('item') > -1) {
      this.loadRemoteItem(this.props.url);
    }
    else if(this.props.url.indexOf('section') > -1) {
      this.loadRemoteSection(this.props.url);
    }
    else {
      console.log('an invalid url was provided', this.props.url);
    }
  },
}

module.exports = PrevNextMixin;
