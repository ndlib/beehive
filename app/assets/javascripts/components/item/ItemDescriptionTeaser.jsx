//app/assets/javascripts/components/ItemDescriptionTeaser.jsx
var React = require('react');

var ItemDescriptionTeaser = React.createClass({
  displayName: "Teaser Text",

  propTypes: {
    item: React.PropTypes.object.isRequired,
    showDescription: React.PropTypes.bool,
    length: React.PropTypes.number,
  },

  render: function() {
    var trimmedDescription = this.props.item.description;
    if(trimmedDescription.length > this.props.length) {
      if(this.props.length === 'undefined') {
        this.props.length = 200;
      }
      trimmedDescription = trimmedDescription.substr(0, this.props.length) + "&hellip;";
    }
    return (
      <div className='item-description' dangerouslySetInnerHTML={{__html: trimmedDescription}}  />
    );
  }
});

module.exports = ItemDescriptionTeaser;
