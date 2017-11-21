//app/assets/javascripts/components/Image.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
$ = jQuery = require('jquery');

var HoneycombImage = createReactClass({
  propTypes: {
    image: PropTypes.object,
    size: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    alt: PropTypes.string,
  },

  style: function() {
    if (this.props.style) {
      return this.props.style;
    } else {
      return {}
    }
  },

  imgSrc: function() {
    if (this.props.image) {
      if (this.props.size) {
        return this.props.image['thumbnail/' + this.props.size].contentUrl;
      } else {
        return this.props.image.contentUrl;
      }
    } else {
      return '/images/intro.jpg';
    }
  },

  altText: function() {
      var alt_html = this.props.alt;
      // text() chokes on plaintext, so to ensure we have html wrap it in a div
      var str = $("<div>" + alt_html + "</div>").text();
      // then fix quotes
      return str.replace("\"", "'");
  },

  render: function() {
    var classString = "hc-thumbnail-image " + this.props.size;
    return (
        <img style={this.style()} src={this.imgSrc()} className={classString} title={this.props.title} alt={this.altText()} />
    );
  }
});

// each file will export exactly one component
module.exports = HoneycombImage;
