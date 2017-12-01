import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const ShowcaseBackground = createReactClass({
  propTypes: {
    showcase: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    percentBlur: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
      percentBlur: 0,
    }
  },

  style: function () {
    let backgroundImage
    if (this.props.showcase.image) {
      backgroundImage = 'url("' + this.props.showcase.image.contentUrl + '")'
    }
    return {
      width: '100%',
      height: this.props.height + 'px',
      display: 'block',
      position: 'absolute',
      backgroundImage: backgroundImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      zIndex: '0',
    }
  },

  coverStyle: function () {
    return {
      width: '100%',
      height: this.props.height + 'px',
      opacity: this.props.percentBlur / 1.5,
      backgroundColor: '#000',
    }
  },

  render: function () {
    return (
      <div id='blur' className='showcase-background' style={this.style()}>
        <div className='showcase-background-cover' style={this.coverStyle()} />
      </div>
    )
  },
})

module.exports = ShowcaseBackground
