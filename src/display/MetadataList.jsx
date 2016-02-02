'use strict'
var React = require('react');
var MetadataItem = require('./MetadataItem.jsx');

var MetadataList = React.createClass({

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },

  // Filters out any keys that should not be displayed
  filteredMetaKeys: function() {
    return Object.keys(this.props.metadata).filter(function(key) {
      return key != "user_defined_id";
    });
  },

  metadataNodes: function() {
    return this.filteredMetaKeys().map(function(key) {
        return (<MetadataItem key={key} metadata={this.props.metadata[key]} />)
    }.bind(this));
  },

  render: function() {
    return (
      <div className="metadata-list">
        { this.metadataNodes() }
      </div>
    );
  }
});

module.exports = MetadataList;
