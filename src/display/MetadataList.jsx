'use strict'
var React = require('react');
var MetadataItem = require('./MetadataItem.jsx');
var mui = require('material-ui');
var ConfigurationStore = require("../store/ConfigurationStore.js");

var MetadataList = React.createClass({

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      printable: true,
    }
  },

  componentWillMount: function(){
    ConfigurationStore.addChangeListener(this.configurationLoaded);
  },

  componentWillUnmount: function() {
    ConfigurationStore.removeChangeListener(this.configurationLoaded);
  },

  configurationLoaded: function() {
    this.setState({ configurationLoaded: true });
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

  printable: function() {
    if(this.props.printable) {
      var url = "/metadata/" + this.props.id;
      return (
        <a href={url} target="_blank"><mui.FontIcon className="material-icons">print</mui.FontIcon>Printer Friendly View</a>
      );
    } else {
      return (<div/>);
    }
  },

  render: function() {
    return (
      <div className="metadata-list">
        { this.metadataNodes() }
        { this.printable() }
      </div>
    );
  }
});

module.exports = MetadataList;
