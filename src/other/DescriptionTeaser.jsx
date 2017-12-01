import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const DescriptionTeaser = createReactClass({
  displayName: 'Teaser Text',

  propTypes: {
    description: PropTypes.string,
  },

  style: function () {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  },

  render: function () {
    return (
      <div
        className='item-description'
        dangerouslySetInnerHTML={{ __html: this.props.description }}
        style={this.style()} />
    )
  },
})

module.exports = DescriptionTeaser
