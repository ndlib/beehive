import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const $ = require('jquery')

const HoneycombImage = createReactClass({
  propTypes: {
    image: PropTypes.object,
    size: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    alt: PropTypes.string,
  },

  style: function () {
    if (this.props.style) {
      return this.props.style
    } else {
      return {}
    }
  },

  imgSrc: function () {
    if (this.props.image) {
      if (this.props.size) {
        return this.props.image['thumbnail/' + this.props.size].contentUrl
      } else {
        return this.props.image.contentUrl
      }
    } else {
      return '/images/intro.jpg'
    }
  },

  altText: function () {
    const altHtml = this.props.alt
    // text() chokes on plaintext, so to ensure we have html wrap it in a div
    const str = $('<div>' + altHtml + '</div>').text()
    // then fix quotes
    return str.replace('"', "'")
  },

  render: function () {
    const classString = 'hc-thumbnail-image ' + this.props.size
    return (
      <img
        style={this.style()}
        src={this.imgSrc()}
        className={classString}
        title={this.props.title}
        alt={this.altText()}
      />
    )
  },
})

module.exports = HoneycombImage
