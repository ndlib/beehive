//app/assets/javascripts/components/ShowcaseBackground.jsx
var React = require('react');

var ShowcaseBackground = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
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
      backgroundSize: "100%",
      zIndex: "-1",
    };
  },

  render: function() {
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <div id="blur" className="showcase-background" style={this.style()}>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseBackground;
