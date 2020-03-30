import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardMedia, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CollectionLink from '../../../Shared/CollectionLink'
import CollectionCardHeader from './CollectionCardHeader'
import MarbleImage from 'assets/images/marble.jpg'

const useStyles = makeStyles({
  card: {
    position: 'relative',
    cursor: 'pointer',
    maxHeight: '450px',
    height: '100%',
    paddingBottom: '60px',
  },
  imageSize: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    minWidth: '50%',
    minHeight: '50%',
    maxWidth: 'initial',
    maxHeight: 'initial',
    display: 'none',
  },
  cardMedia: {
    backgroundImage: props => 'url("' + props.image + '")',
    paddingBottom: '46.85%',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    width: '100%',
    overflow: 'hidden',
  },
  actionButtons: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    borderTopColor: 'rgba(0,0,0,0.12)',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
  exploreLabel: {
    position: 'relative',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
    fontWeight: '500',
  },
})

const CollectionCard = ({ collection, headerTitle }) => {
  const image = collection.image
    ? collection.image['thumbnail/medium'].contentUrl.replace(new RegExp(' ', 'g'), '%20')
    : MarbleImage
  const classes = useStyles({
    image,
  })

  return (
    <Card className={classes.card}>
      <CollectionLink collection={collection}>
        {headerTitle && (
          <CardHeader title={headerTitle} />
        )}
        <CardMedia className={classes.cardMedia}>
          <img src={image} className={classes.imageSize} alt='' />
        </CardMedia>
        <CollectionCardHeader collection={collection} />
      </CollectionLink>
      <CardActions className={classes.actionButtons}>
        <CollectionLink button collection={collection} className={{ root: classes.exploreLabel }}>
          Explore
        </CollectionLink>
      </CardActions>
    </Card>
  )
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
  headerTitle: PropTypes.string,
}

// each file will export exactly one component
export default CollectionCard
