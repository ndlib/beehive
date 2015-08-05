//app/assets/javascripts/components/MetadataHTML.jsx
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
// each file will export exactly one component
module.exports = MetadataHTML;
