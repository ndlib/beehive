import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CollectionUrl from '../../modules/CollectionUrl.jsx'

const CollectionHomeButton = createReactClass({
  propTypes: {
    collection: PropTypes.object,
  },

  onClick: function () {
    window.location = CollectionUrl.collectionUrl(this.props.collection)
  },

  render: function () {
    return (
      <IconButton
        onClick={this.onClick}
        disableRipple
        style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000' }}
      >
        <HomeIcon className='material-icons' />
      </IconButton>
    )
  },
})

export default CollectionHomeButton
