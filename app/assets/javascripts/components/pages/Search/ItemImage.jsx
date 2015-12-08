var React = require("react");

var ItemImage = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes : {
    image: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      width: "70px",
      height: "70px",
      display: "inline-block",
      position: "absolute",
      top: "8px",
      left: "16px",
    }
  },

  render: function() {
    return (
      <img src={this.props.image["thumbnail/medium"].contentUrl} style={this.style()} />
    );
  }

});

module.exports = ItemImage
