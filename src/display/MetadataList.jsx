'use strict'
var React = require('react');
var MetadataItem = require('./MetadataItem.jsx');
var ConfigurationStore = require("../store/ConfigurationStore.js");

var MetadataList = React.createClass({

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },

  componentWillMount: function(){
    ConfigurationStore.addChangeListener(this.forceUpdate);
  },

  orderByConfiguration: function(keys) {
    return keys.sort(function(key1, key2) {
      var field1 = ConfigurationStore.fields[key1]
      var field2 = ConfigurationStore.fields[key2]
      if(field1 && field2){
        return field1.order - field2.order;
      }
      // When field1 and field2 are not defined in the config, leave order unchanged
      return 0;
    });
  },

  // Filters out any keys that should not be displayed
  filteredMetaKeys: function(keys) {
    return keys.filter(function(key) {
      return key != "user_defined_id";
    });
  },

  metadataNodes: function() {
    var keys = Object.keys(this.props.metadata);
    keys = this.filteredMetaKeys(keys);
    keys = this.orderByConfiguration(keys);
    return keys.map(function(key) {
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
