//app/assets/javascripts/components/Image.jsx
var React = require('react');
$ = jQuery = require('jquery');

var Image = React.createClass({
  propTypes: {
    image: React.PropTypes.object,
    size: React.PropTypes.string,
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
      if (this.props.size) {
        return this.props.image['thumbnail/' + this.props.size].contentUrl;
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
    var classString = "hc-thumbnail-image " + this.props.size;
    return (
        <img style={this.style()} src={this.thumbnailSrc()} className={classString} title={this.props.title} alt={this.thumbnailCaption()} />
    );
  }
});

// each file will export exactly one component
module.exports = Image;
