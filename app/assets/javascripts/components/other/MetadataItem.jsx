//app/assets/javascripts/components/MetadataItem.jsx
var React = require('react');

var linkPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

var MetadataItem = React.createClass({
  displayName: 'Metadata Item',

  propTypes: {
    metadata: React.PropTypes.object.isRequired,
  },

  value: function() {
    if (linkPattern.test(this.props.metadata.value)) {
      var matches = this.props.metadata.value.split(linkPattern);
      var replacedNodes = matches.map(function(string, index) {
        if (linkPattern.test(string)) {
          return (
            <a href={string} key={index} target='_blank' rel='nofollow'>{string}</a>
          );
        } else {
          return string;
        }
      });
      return replacedNodes;
    } else {
      return this.props.metadata.value;
    }
  },

  render: function() {
    var dd = "";
    if(typeof(this.value()) == "object") {
      dd = (<dd>{this.value()}</dd>);
    }
    else if(typeof(this.value()) == "string") {
      dd = (<dd dangerouslySetInnerHTML={{__html: this.value()}} />);
    }
    return (
      <dl>
        <dt>{this.props.metadata.label}</dt>
        {dd}
      </dl>
    );
  }
});

// each file will export exactly one component
module.exports = MetadataItem;
