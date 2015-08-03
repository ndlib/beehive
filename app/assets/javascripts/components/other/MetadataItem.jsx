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
      MetadataDate: this.simpleValue,
      MetadataHTML: this.htmlValue,
      MetadataText: this.simpleValue,
    });
  },

  stringValue: function (metadata_field) {
    if (linkPattern.test(metadata_field.value)) {
      var linkStyle = {wordBreak: "break-word",};
      var matches = metadata_field.value.split(linkPattern);
      var replacedNodes = matches.map(function(string, index) {
        if (linkPattern.test(string)) {
          return (
            <a href={string} key={index} target="_blank" rel="nofollow" style={linkStyle}>{string}</a>
          );
        } else {
          return string;
        }
      });
      return replacedNodes;
    } else {
      return (<div>{metadata_field.value}</div>);
    }
  },

  simpleValue: function (metadata_field) {
    return (<div>{metadata_field.value}</div>);
  },

  htmlValue: function (metadata_field) {
    return (<div dangerouslySetInnerHTML={{__html: metadata_field.value}} />);
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
