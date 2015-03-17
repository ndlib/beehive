//app/assets/javascripts/components/DescriptionTeaser.jsx
var React = require('react');

var DescriptionTeaser = React.createClass({
  displayName: "Teaser Text",

  propTypes: {
    description: React.PropTypes.string,
    showDescription: React.PropTypes.bool,
    length: React.PropTypes.number,
  },

  render: function() {
    var trimmedDescription = this.props.description;
    if(this.props.length == null) {
        this.props.length = 200;
    }
    if(trimmedDescription.length > this.props.length) {
      trimmedDescription = trimmedDescription.substr(0, this.props.length) + "&hellip;";
    }
    return (
      <div className='item-description' dangerouslySetInnerHTML={{__html: trimmedDescription}}  />
    );
  }
});

module.exports = DescriptionTeaser;
