//app/assets/javascripts/components/MetadataItem.jsx
var React = require('react');

var MetadataString = require('./MetadataString');
var MetadataDate = require('./MetadataDate');
var MetadataHTML = require('./MetadataHTML');
var MetadataText = require('./MetadataText');

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
    return (<MetadataComponent key={index} label={this.props.metadata.label} metadata_field={metadata_field} />);
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
// each file will export exactly one component
module.exports = MetadataItem;
