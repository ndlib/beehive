import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var DescriptionTeaser = createReactClass({
  displayName: 'Teaser Text',

  propTypes: {
    description: PropTypes.string,
    showDescription: PropTypes.bool,
    length: PropTypes.number,
  },

  style: function () {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  },

  render: function () {
    var trimmedDescription = this.props.description
    return (
      <div className='item-description' dangerouslySetInnerHTML={{ __html: trimmedDescription }} style={this.style()} />
    )
  },
})

module.exports = DescriptionTeaser
