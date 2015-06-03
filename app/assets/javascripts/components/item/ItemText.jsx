var React = require("react");

var ItemText = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className="bee-item-text">
        <h2>{this.props.item.name}</h2>
        <div className="bee-item-description" dangerouslySetInnerHTML={{__html: this.props.item.description}}/>
      </div>
    );
  }
});

module.exports = ItemText;
