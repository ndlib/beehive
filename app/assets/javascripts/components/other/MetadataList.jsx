//app/assets/javascripts/components/MetadataList.jsx
var React = require('react');

var MetadataList = React.createClass({
  displayName: 'Metadata List',
  propTypes: {
    metadata: React.PropTypes.array.isRequired,
  },
  render: function() {
    var metadataNodes = this.props.metadata.map(function(metadata, index) {
      return (
        <MetadataItem key={metadata.label} metadata={metadata} />
      )
    });
    return (
      <div className="metadata-list">
        {metadataNodes}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = MetadataList;
