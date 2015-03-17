//app/assets/javascripts/components/DescriptionTeaser.jsx
var React = require('react');

var DescriptionTeaser = React.createClass({
  displayName: "Teaser Text",

  propTypes: {
    description: React.PropTypes.string,
    showDescription: React.PropTypes.bool,
    length: React.PropTypes.number,
  },

  style: function() {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },

  render: function() {
    var trimmedDescription = this.props.description;
    return (
      <div className='item-description' dangerouslySetInnerHTML={{__html: trimmedDescription}}  style={this.style()} />
    );
  }
});

module.exports = DescriptionTeaser;
