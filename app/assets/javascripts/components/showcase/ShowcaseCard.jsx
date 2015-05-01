//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require('react');

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      height: 300,
    };
  },

  style: function() {
    return {
      position: "relative",
      height: this.props.height + "px",
      cursor: 'pointer',
    };
  },

  backgroundHolderStyle: function() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
    };
  },

  backgroundStyle: function() {
    var backgroundImage;
    if (this.props.showcase.image) {
      backgroundImage = "url(\"" + this.props.showcase.image.contentUrl + "\")";
    }
    return {
      width: "100%",
      height: "100%",
      position: "relative",
      background: backgroundImage + " 50% 50% / cover no-repeat",
    };
  },

  titleStyle: function() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
      padding: "2em",
      backgroundImage: "linear-gradient(to bottom,rgba(0,0,0,0.5) 0,transparent 100%)",
      backgroundRepeat: "repeat-x",
      overflow: "hidden",
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.showcaseUrl(this.props.showcase);
  },

  render: function() {
    return (
      <Card>
        <div className="showcase-card" style={this.style()} onClick={this.onClick}>
          <div className="showcase-card-background-holder" style={this.backgroundHolderStyle()}>
            <div className="showcase-card-background" style={this.backgroundStyle()}></div>
          </div>
          <div className="showcase-card-title" style={this.titleStyle()}>
            <ShowcaseTitle showcase={this.props.showcase} width="100%" />
          </div>
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
