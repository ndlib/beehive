//app/assets/javascripts/components/MetadataHTML.jsx
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
// each file will export exactly one component
module.exports = MetadataText;
