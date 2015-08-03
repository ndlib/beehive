//app/assets/javascripts/components/MetadataItem.jsx
var React = require('react');

var linkPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

var MetadataItem = React.createClass({
  displayName: 'Metadata Item',

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },

  fieldTypeMap: function() {
    return ({
      MetadataString: this.stringValue,
      MetadataDate: this.dateValue,
      MetadataHTML: this.htmlValue,
      MetadataText: this.simpleValue,
    });
  },

  stringValue: function (metadata_field) {
    return (<MetadataString label={this.props.metadata.label} metadata_field={metadata_field} />);
  },

  simpleValue: function (metadata_field) {
    return (<MetadataText label={this.props.metadata.label} metadata_field={metadata_field} />);
  },

  htmlValue: function (metadata_field) {
    return (<MetadataHTML label={this.props.metadata.label} metadata_field={metadata_field} />);
  },

  dateValue: function (metadata_field) {
    return (<MetadataDate label={this.props.metadata.label} metadata_field={metadata_field} />);
  },

  value: function(metadata_field) {
    var formatFunction = this.fieldTypeMap()[metadata_field["@type"]];
    return formatFunction(metadata_field);
  },

  map_arrays_to_values: function () {
    return this.props.metadata.values.map(function (metadata_field) {
      return this.value(metadata_field);
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
