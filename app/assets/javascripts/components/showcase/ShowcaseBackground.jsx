//app/assets/javascripts/components/ShowcaseBackground.jsx
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
    // var blurAmt = Math.min(Math.max(Math.floor((this.props.percentBlur) * 10), 0), 10);
    // var blurBrightness = Math.min(Math.max(Math.floor(100 - (this.props.percentBlur) * 60), 70), 100);
    // var blurStr = "blur(" + blurAmt + "px) brightness(" + blurBrightness + "%)";
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
      // WebkitFilter: blurStr,
      // MozFilter: blurStr,
      // OFilter: blurStr,
      // filter: blurStr,
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
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <div id="blur" className="showcase-background" style={this.style()}>
        <div className="showcase-background-cover" style={this.coverStyle()}>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseBackground;
