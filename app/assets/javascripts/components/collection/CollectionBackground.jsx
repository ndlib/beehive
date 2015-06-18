var React = require("react");

var CollectionBackground = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    var styles = {};
    if (this.props.collection.image) {
      styles = {
        backgroundImage: "url(\"" + this.props.collection.image['thumbnail/medium'].contentUrl + "\")",
      };
    }
    return styles;
  },

  className: function() {
    if (this.props.collection.image) {
      return "collection-background";
    } else {
      return "";
    }
  },

  render: function() {
    return (
      <div style={this.style()} className={this.className()}>
      </div>
    )
  }
});

module.exports = CollectionBackground;
