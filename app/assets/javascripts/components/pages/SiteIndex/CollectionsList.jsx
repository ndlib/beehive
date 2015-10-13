//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');

var CollectionsList = React.createClass({
  displayName: 'Collections List',

  propTypes: {
    collections: React.PropTypes.array,
  },

  collectionNodes: function() {
    return this.props.collections.map(function(collection, index) {
      return (<CollectionCard collection={collection} key={index} />);
    });
  },

  render: function() {
    return (
      <GridList className="collections-list">
        {this.collectionNodes()}
      </GridList>
    );
  }

});

// each file will export exactly one component
module.exports = CollectionsList;
