//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');

var CollectionsListItem = React.createClass({
  displayName: 'Collections List Item',
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className="well collections-list-item">
        <CollectionLink collection={this.props.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionsListItem;
