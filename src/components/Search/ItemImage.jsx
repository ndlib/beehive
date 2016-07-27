var React = require("react");

var ItemImage = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx')
  ],

  propTypes : {
    item: React.PropTypes.object.isRequired,
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
    if (this.props.item.image || this.props.item.multimedia) {
      return {
        width: "100%",
        height: "100%",
        position: "absolute",
        objectFit: "cover"
      };
    } else {
      return {};
    }
  },

  image: function() {
    if(this.props.item.image) {
      return this.props.item.image["thumbnail/medium"].contentUrl;
    } else if (this.props.item.multimedia) {
      return this.props.item.thumbnailUrl;
    }
  },

  render: function() {
    return (
      <div className="bee-item-image-wrapper">
        <div className="bee-item-image" style={this.imageStyle()}>
          <div className="bee-item-holder" style={this.holderStyle()}>
            <img src={ this.image() } style={this.backgroundStyle()}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ItemImage
