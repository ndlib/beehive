'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionIntroCard = require('./CollectionIntroCard.jsx');
var ShowcasesCardList = require('./ShowcasesCardList.jsx');
var CollectionShowShowcases = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  intro: function() {
    if (this.props.collection.description) {
      return (
        <CollectionIntroCard collection={this.props.collection} />
      );
    }
  },

  render: function() {
    if (this.props.collection.showcases) {
      return (
        <ShowcasesCardList showcases={this.props.collection.showcases} intro={this.intro()} />
      );
    } else {
      return (
        <div />
      );
    }
  }
});

module.exports = CollectionShowShowcases;
