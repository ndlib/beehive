//app/assets/javascripts/components/Thumbnail.jsx
var React = require('react');

var Thumbnail = React.createClass({
  displayName: 'Thumbnail',
  propTypes: {
    image: React.PropTypes.object,
    thumbnailType: React.PropTypes.string,
  },

  getInitialState: function() {
    if (this.props.image) {
      return {
        image: this.props.image,
      };
    } else {
      return {
        image: null
      };
    }
  },

  thumbnailSrc: function() {
    if (this.state.image) {
      if (this.props.thumbnailType) {
        return this.state.image['thumbnail/' + this.props.thumbnailType].contentUrl;
      } else {
        return this.state.image.contentUrl;
      }
    } else {
      return '/images/blank.png';
    }
  },

  render: function() {
    return (
      <span>
        <img src={this.thumbnailSrc()} className="hc-thumbnail-image"/>
      </span>
    );
  }
});

// each file will export exactly one component
module.exports = Thumbnail;
