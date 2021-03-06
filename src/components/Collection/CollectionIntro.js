import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const CollectionIntro = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  style: function () {
    return ({
      margin:'60px 0',
      overflow: 'hidden',
    })
  },

  render: function () {
    if (this.props.collection) {
      return (
        <div
          className='essay-content'
          style={this.style()}
          dangerouslySetInnerHTML={{ __html:this.props.collection.short_description }}
        />
      )
    }
  },
})

export default CollectionIntro
