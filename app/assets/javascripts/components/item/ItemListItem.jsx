var React = require("react");

var ItemListItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired,
    className: React.PropTypes.string.isRequired,
  },

  onClick: function() {
    window.location.hash = "modal-" + this.props.item.id;
  },

  targetID: function() {
    return "#modal-" + this.props.item.id;
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <div key={this.props.item["@id"]} className="bee-item">
          <a href={this.targetID()} data-toggle="modal" data-target={this.targetID()} onClick={this.onClick}>
            <ItemImage image={this.props.item.image} />
            <ItemText item={this.props.item} />
          </a>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemListItem;
