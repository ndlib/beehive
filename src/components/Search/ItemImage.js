import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import MetaOnlyIcon from 'assets/images/meta-only-item.jpg'

const useStyles = makeStyles({
  image: {
    paddingTop: '100%',
    position: 'relative',
  },
  holder: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover',
  },
})

const ItemImage = ({ item, size }) => {
  const classes = useStyles()
  const imageUrl = item.thumbnailURL
    ? (size ? item.thumbnailURL.replace('/medium/', `/${size}/`) : item.thumbnailURL)
    : MetaOnlyIcon
  const altText = item.name + (item.description ? ` - ${item.description}` : '')
  return (
    <div className='bee-item-image-wrapper'>
      <div className={classes.image}>
        <div className={classes.holder}>
          <img src={imageUrl} className={classes.background} title={altText} alt={altText} />
        </div>
      </div>
    </div>
  )
}

ItemImage.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnailURL: PropTypes.string,
  }).isRequired,
  size: PropTypes.string,
}

export default ItemImage
