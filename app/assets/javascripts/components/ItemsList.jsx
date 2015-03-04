//app/assets/javascripts/components/ItemsList.jsx
var React = require('react');

var ItemsList = React.createClass({
  displayName: 'Items List',

  propTypes: {
    items: React.PropTypes.array,
  },

  render: function() {
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
        <div>
          <ItemsListItem item={item} />
        </div>
      ));
      return nodes;
    });
    return (
      <div>
        <h2>Item List</h2>
        <div>{itemNodes}</div>
      </div>
    );

  }
});

// each file will export exactly one component
module.exports = ItemsList;
