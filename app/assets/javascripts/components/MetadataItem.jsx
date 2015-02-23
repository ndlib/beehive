//app/assets/javascripts/components/MetadataItem.jsx
var React = require('react');

var MetadataItem = React.createClass({
  displayName: 'Metadata Item',
  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },
  render: function() {
    return (
      <dl>
        <dt>{this.props.metadata.label}</dt>
        <dd>{this.props.metadata.value}</dd>
      </dl>
    );
  }
});

// each file will export exactly one component
module.exports = MetadataItem;
