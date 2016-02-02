'use strict'
var React = require('react');

var MetadataString = require('./MetadataString.jsx');
var MetadataDate = require('./MetadataDate.jsx');
var MetadataHTML = require('./MetadataHTML.jsx');
var MetadataText = require('./MetadataText.jsx');

var fieldTypeMap = {
  MetadataString: MetadataString,
  MetadataDate: MetadataDate,
  MetadataHTML: MetadataHTML,
  MetadataText: MetadataText,
};

var MetadataItem = React.createClass({
  displayName: 'Metadata Item',

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },

  value: function(metadata_field, index) {
    var MetadataComponent = fieldTypeMap[metadata_field["@type"]];
    return (<MetadataComponent key={index} metadata_field={metadata_field} />);
  },

  map_arrays_to_values: function () {
    return this.props.metadata.values.map(function (metadata_field, index) {
      return this.value(metadata_field, index);
    }, this);
  },

  render: function() {
    return (
      <dl>
        <dt>{this.props.metadata.label}</dt>
        <dd>{this.map_arrays_to_values()}</dd>
      </dl>
    );
  }
});

module.exports = MetadataItem;
