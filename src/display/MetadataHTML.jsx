'use strict'
var React = require('react');

var MetadataHTML = React.createClass({
  displayName: 'Metadata HTML',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (<div dangerouslySetInnerHTML={{__html: this.props.metadata_field.value}} />);
  }
});

module.exports = MetadataHTML;
