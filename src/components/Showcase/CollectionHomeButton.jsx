import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { FloatingActionButton, FontIcon } from 'material-ui'
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

const CollectionHomeButton = createReactClass({
  propTypes: {
    collection: PropTypes.object,
  },

  onClick: function () {
    window.location = CollectionUrl.collectionUrl(this.props.collection)
  },

  render: function () {
    return (
      <FloatingActionButton
        onClick={this.onClick}
        disableTouchRipple
        style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000' }}
      >
        <FontIcon
          className='material-icons'
          color='white'
        >home
        </FontIcon>
      </FloatingActionButton>
    )
  },
})

module.exports = CollectionHomeButton
