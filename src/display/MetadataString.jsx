'use strict'
var React = require('react');

var linkPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

var MetadataString = React.createClass({
  displayName: 'Metadata String',

  propTypes: {
    metadata_field: React.PropTypes.object.isRequired,
  },

  render: function () {
    if (linkPattern.test(this.props.metadata_field.value)) {
      var linkStyle = {wordBreak: "break-word",};
      var matches = this.props.metadata_field.value.split(linkPattern);
      var replacedNodes = matches.map(function(string, index) {
        if (linkPattern.test(string)) {
          if(string.includes('dave.library.nd.edu') || string.includes('localhost:3024')) {
            var sIndex = string.indexOf('?');
            var newReferral = '?ref=' + window.location;
            if(sIndex > -1) {
              string = string.substring(0, string.indexOf('?')) + newReferral;
            } else {
              string += newReferral;
            }
          }
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

module.exports = MetadataString;
