import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardMedia, GridListTile } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ItemImage from './ItemImage'
import TextOverlay from 'components/Shared/TextOverlay'
import CollectionUrl from 'modules/CollectionUrl'

const useStyles = makeStyles({
  card: {
    position: 'relative',
    cursor: 'pointer',
    height: 'auto',
  },
  media: {
    backgroundImage: props => 'url("' + props.image + '")',
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: '100%',
  },
})

const GridItem = ({ item, style }) => {
  const image = item.thumbnailURL
    ? item.thumbnailURL.replace(new RegExp(' ', 'g'), '%20')
    : '/images/meta-only-item.jpg'
  const classes = useStyles({
    image,
  })
  return (
    <GridListTile style={style}>
      <Card className={classes.card}>
        <Link to={CollectionUrl.itemObjectUrl(item)} title={item.name}>
          <CardMedia className={classes.media}>
            <ItemImage item={item} size='medium' />
            <TextOverlay title={item.name} />
          </CardMedia>
          {item.metadata && item.metadata.manuscript_url && (
            <img
              src='/images/pt.icon.drk.png'
              className='manuscript-icon'
              alt='Manifest Available'
              title='Manifest Available'
              style={{ position: 'absolute', right: '0', top: '0', maxWidth: '15%' }}
            />
          )}
        </Link>
      </Card>
    </GridListTile>
  )
}

GridItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    thumbnailURL: PropTypes.string,
    metadata: PropTypes.shape({
      manuscript_url: PropTypes.string,
    }),
  }).isRequired,
  style: PropTypes.object,
}

export default GridItem
