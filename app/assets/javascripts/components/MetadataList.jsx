//app/assets/javascripts/components/MetadataList.jsx
var React = require('react');

var MetadataList = React.createClass({
  displayName: 'Metadata List',
  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },
  render: function() {
    console.log(this.props.metadata);
     var metadataNodes = this.props.metadata.map(function(metadata, index) {
      var nodes = [];
      nodes.push((
          <MetadataItem metadata={metadata} />
      ));
      return nodes;
    });
    return (
      <div>
        <h3>Metadata</h3>
        <div>{metadataNodes}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = MetadataList;
