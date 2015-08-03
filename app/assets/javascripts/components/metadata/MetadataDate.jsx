//app/assets/javascripts/components/MetadataDate.jsx
var React = require('react');

var MetadataDate = React.createClass({
  displayName: 'Metadata Date',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (<time itemProp={this.props.label} dateTime={this.props.metadata_field.iso8601}>{this.props.metadata_field.value}</time>);
  }
});
// each file will export exactly one component
module.exports = MetadataDate;
