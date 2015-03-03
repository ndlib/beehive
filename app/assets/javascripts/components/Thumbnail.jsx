//app/assets/javascripts/components/Thumbnail.jsx
var React = require('react');

var Thumbnail = React.createClass({
  displayName: 'Thumbnail',
  propTypes: {
    image: React.PropTypes.object,
    thumbnailType: React.PropTypes.string,
    style: React.PropTypes.object
  },

  style: function() {
    if (this.props.style) {
      return this.props.style;
    } else {
      return {}
    }
  },

  thumbnailSrc: function() {
    if (this.props.image) {
      if (this.props.thumbnailType) {
        return this.props.image['thumbnail/' + this.props.thumbnailType].contentUrl;
      } else {
        return this.props.image.contentUrl;
      }
    } else {
      return '/images/blank.png';
    }
  },

  render: function() {
    return (
      <span>
        <img src={this.thumbnailSrc()} className="hc-thumbnail-image" />
      </span>
    );
  }
});

// each file will export exactly one component
module.exports = Thumbnail;
