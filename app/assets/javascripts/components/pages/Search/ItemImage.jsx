var React = require("react");

var ItemImage = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes : {
    image: React.PropTypes.object.isRequired,
  },

  imageStyle: function() {
    return {
      paddingTop: "100%",
      position: "relative"
    };
  },

  holderStyle: function() {
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
        position: "absolute",
        background: backgroundImage + " 50% 50% / cover no-repeat",
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <div className="bee-item-image-wrapper">
        <div className="bee-item-image" style={this.imageStyle()}>
          <div className="bee-item-holder" style={this.holderStyle()}>
            <div className="bee-item-background" style={this.backgroundStyle()} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ItemImage
