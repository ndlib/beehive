//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');
var mui = require('material-ui')

var CollectionsList = React.createClass({
  displayName: 'Collections List',

  propTypes: {
    collections: React.PropTypes.array,
  },

  collectionNodes: function() {
    return this.props.collections.map(function(collection, index) {
      return (<CollectionCard collection={collection}  />);
    });
  },

  render: function() {
    return (
      <mui.GridList cols={3} cellHeight={500} padding={24}>
        {this.collectionNodes()}
      </mui.GridList>
    );
  }

});

// each file will export exactly one component
module.exports = CollectionsList;
