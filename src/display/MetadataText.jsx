'use strict'
var React = require('react');

var MetadataText = React.createClass({
  displayName: 'Metadata Text',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (<div>{this.props.metadata_field.value}</div>);
  }
});

module.exports = MetadataText;
