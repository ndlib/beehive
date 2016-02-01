'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Bee = require('../../../Bee');

var SearchPage = React.createClass({

  render: function() {
    return (
      <div>
        <Bee.Search
          collection={window.honeycomb + "/v1/collections/"
            + this.props.params.collectionID}
        />
        {this.props.children}
      </div>
    )
  }
});
module.exports = SearchPage;
