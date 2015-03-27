//app/assets/javascripts/components/Thumbnail.jsx
var React = require('react');

var Thumbnail = React.createClass({
  displayName: 'Thumbnail',
  propTypes: {
    image: React.PropTypes.object,
    thumbnailType: React.PropTypes.string,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    alt: React.PropTypes.string,
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

  thumbnailCaption: function() {
      var alt_html = this.props.alt;
      // text() chokes on plaintext, so to ensure we have html wrap it in a div
      var str = $("<div>" + alt_html + "</div>").text();
      // then fix quotes
      return str.replace("\"", "'");
  },

  render: function() {
    var classString = "hc-thumbnail-image " + this.props.thumbnailType;
    return (
      <span>
        <img src={this.thumbnailSrc()} className={classString} title={this.props.title} alt={this.thumbnailCaption()} />
      </span>
    );
  }
});

// each file will export exactly one component
module.exports = Thumbnail;
