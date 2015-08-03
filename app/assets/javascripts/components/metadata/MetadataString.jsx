//app/assets/javascripts/components/MetadataString.jsx
var React = require('react');

var linkPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

var MetadataString = React.createClass({
  displayName: 'Metadata String',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  render: function () {
    if (linkPattern.test(this.props.metadata_field.value)) {
      var linkStyle = {wordBreak: "break-word",};
      var matches = this.props.metadata_field.value.split(linkPattern);
      var replacedNodes = matches.map(function(string, index) {
        if (linkPattern.test(string)) {
          return (
            <a href={string} key={index} target="_blank" rel="nofollow" style={linkStyle}>{string}</a>
          );
        } else {
          return (<div key={index}>{string}</div>);
        }
      });
      return (<div>{replacedNodes}</div>);
    } else {
      return (<div>{this.props.metadata_field.value}</div>);
    }
  }
});
// each file will export exactly one component
module.exports = MetadataString;
