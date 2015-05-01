//app/assets/javascripts/components/layout/CardBackground.jsx
var React = require('react');

var CardBackground = React.createClass({
  propTypes: {
    image: React.PropTypes.object,
  },

  style: function() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
    };
  },

  backgroundStyle: function() {
    if (this.props.image) {
      var backgroundImage;
      backgroundImage = "url(\"" + this.props.image["thumbnail/medium"].contentUrl + "\")";
      return {
        width: "100%",
        height: "100%",
        position: "relative",
        background: backgroundImage + " 50% 50% / cover no-repeat",
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <div className="bee-card-background-holder" style={this.style()}>
        <div className="bee-card-background" style={this.backgroundStyle()}></div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CardBackground;
