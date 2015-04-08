//app/assets/javascripts/components/ItemsListItem.jsx
var React = require('react');

var ItemsListItem = React.createClass({
  displayName: 'Items List Item',

  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
      return (
        <ItemLink item={this.props.item} showDescription={true} thumbnailType="medium" />
    );
  }
});

// each file will export exactly one component
module.exports = ItemsListItem;
