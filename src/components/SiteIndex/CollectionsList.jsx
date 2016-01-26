'use strict'
var React = require('react');
var mui = require('material-ui')
var MediaQuery = require('react-responsive');

var CollectionCard = require('./CollectionCard.jsx');

var CollectionsList = React.createClass({
  displayName: 'Collections List',

  propTypes: {
    collections: React.PropTypes.array,
  },

  collectionNodes: function() {
    return this.props.collections.map(function(collection, index) {
      return (<CollectionCard collection={collection} cardHeight={450} />);
    });
  },

  gridList: function(cols) {
    return (
      <mui.GridList cols={cols} cellHeight={'auto'} padding={24}>
        {this.collectionNodes()}
      </mui.GridList>
    );
  },

  render: function() {
    return (
      <div>
        <MediaQuery maxWidth={650}>
          {this.gridList(1)}
        </MediaQuery>
        <MediaQuery minWidth={650} maxWidth={1724}>
          {this.gridList(2)}
        </MediaQuery>
        <MediaQuery minWidth={1724}>
          {this.gridList(3)}
        </MediaQuery>
      </div>
    );
  }
});

module.exports = CollectionsList;