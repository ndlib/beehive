'use strict'
var React = require('react');

var ShowcaseBackground = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
    percentBlur: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      percentBlur: 0,
    }
  },

  style: function() {
    var backgroundImage;
    if (this.props.showcase.image) {
      backgroundImage = "url(\"" + this.props.showcase.image.contentUrl + "\")";
    }
    return {
      width: "100%",
      height: this.props.height + 'px',
      display: "block",
      position: "absolute",
      backgroundImage: backgroundImage,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      zIndex: "-1",
    };
  },

  coverStyle: function() {
    return {
      width: "100%",
      height: this.props.height + 'px',
      opacity: this.props.percentBlur / 1.5,
      backgroundColor: '#000',
    }
  },

  render: function() {
    return (
      <div id="blur" className="showcase-background" style={this.style()}>
        <div className="showcase-background-cover" style={this.coverStyle()}>
        </div>
      </div>
    );
  }
});

module.exports = ShowcaseBackground;
