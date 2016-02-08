'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionIntroCard = require('./CollectionIntroCard.jsx');
var SitePathCardList = require('./SitePathCardList.jsx');
var CollectionShowSitePath = React.createClass({

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
    if (this.props.collection.site_path) {
      return (
        <SitePathCardList sitePath={this.props.collection.site_path} intro={this.intro()} />
      );
    } else {
      return (
        <div />
      );
    }
  }
});

module.exports = CollectionShowSitePath;
