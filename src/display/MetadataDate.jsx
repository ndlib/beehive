'use strict'
var React = require('react');

var MetadataDate = React.createClass({
  displayName: 'Metadata Date',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (<time dateTime={this.props.metadata_field.iso8601}>{this.props.metadata_field.value}</time>);
  }
});

module.exports = MetadataDate;
