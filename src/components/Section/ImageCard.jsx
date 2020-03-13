import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { CardMedia } from '@material-ui/core'
import CardCaption from './CardCaption.jsx'

const ImageCard = createReactClass({

  propTypes: {
    section: PropTypes.object.isRequired,
  },

  style: function () {
    return {
      position:'relative',
    }
  },

  render: function () {
    return (
      <div style={this.style()}>
        <CardMedia className='img'>
          <img
            style={{ width: 'auto' }}
            src={this.props.section.item.media.thumbnailUrl}
            alt=''
          />
        </CardMedia>
        <CardCaption caption={this.props.section.caption} />
      </div>
    )
  },
})

export default ImageCard
