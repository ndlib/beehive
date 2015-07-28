//app/assets/javascripts/components/MetadataList.jsx
var React = require('react');

var MetadataList = React.createClass({
  displayName: 'Metadata List',
  propTypes: {
    metadata: React.PropTypes.array.isRequired,
  },
  render: function() {
    var metadataNodes = Object.keys(this.props.metadata).map(function(key) {
      return (
        <MetadataItem key={key} metadata={this.props.metadata[key]} />
      )
    }.bind(this));
    return (
      <div className="metadata-list">
        {metadataNodes}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = MetadataList;
