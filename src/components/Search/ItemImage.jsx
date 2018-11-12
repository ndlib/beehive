import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const ItemImage = createReactClass({
  propTypes : {
    item: PropTypes.object.isRequired,
    size: PropTypes.string,
  },

  imageStyle: function () {
    return {
      paddingTop: '100%',
      position: 'relative',
    }
  },

  holderStyle: function () {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
    }
  },

  backgroundStyle: function () {
    return {
      width: '100%',
      height: '100%',
      position: 'absolute',
      objectFit: 'cover',
    }
  },

  image: function () {
    if (this.props.item.thumbnailURL) {
      if (this.props.size) {
        return this.props.item.thumbnailURL.replace('/medium/', `/${this.props.size}/`)
      } else {
        return this.props.item.thumbnailURL
      }
    } else {
      return '/images/meta-only-item.jpg'
    }
  },

  altText: function() {
    let out = this.props.item.name
    if (this.props.item.description) {
      out += ` - ${this.props.item.description}`
    }
    return out
  },

  render: function () {
    return (
      <div className='bee-item-image-wrapper'>
        <div className='bee-item-image' style={this.imageStyle()}>
          <div className='bee-item-holder' style={this.holderStyle()}>
            <img src={this.image()} style={this.backgroundStyle()} title={this.altText()} alt={this.altText()} />
          </div>
        </div>
      </div>
    )
  },

})

module.exports = ItemImage
