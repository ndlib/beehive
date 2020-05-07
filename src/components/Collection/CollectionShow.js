import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardMedia, IconButton, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Link } from 'react-router-dom'
import TextOverlay from 'components/Shared/TextOverlay'
import Loading from 'other/Loading'

import CollectionUrl from 'modules/CollectionUrl'

const useStyles = makeStyles({
  mediaRoot: {
    position: 'relative',
  },
  coverImage: {
    backgroundSize: 'cover',
    height: '40vw',
    maxHeight: '450px',
    backgroundImage: props => props.image ? 'url("' + props.image + '")' : null,
    backgroundPosition: 'top',
  },
  actions: {
    margin: '0 8%',
  },
})

const CollectionShow = ({ collection }) => {
  const image = (collection.image && collection.image['thumbnail/medium'])
    ? collection.image['thumbnail/medium'].contentUrl.replace(new RegExp(' ', 'g'), '%20')
    : null
  const startUrl = CollectionUrl.introUrl(collection) || CollectionUrl.startSitePathUrl(collection)
  const classes = useStyles({
    image,
  })

  if (!collection.name) {
    return <Loading />
  }

  return (
    <Paper square>
      <Card>
        <CardMedia className={classes.mediaRoot}>
          {collection.display_page_title && (
            <TextOverlay title={collection.name_line_1} subtitle={collection.name_line_2} addMargin />
          )}
          {image && (
            <img src={image} className='hide' alt='' />
          )}
          <div className={`cover ${classes.coverImage}`} />
        </CardMedia>
      </Card>
      <CardActions className={`startButton ${classes.actions}`}>
        {startUrl && (
          <Link to={startUrl} style={{ position: 'absolute', right: '0', top: '-30px' }}>
            <IconButton>
              <ArrowForwardIcon className='material-icons' />
            </IconButton>
          </Link>
        )}
      </CardActions>
    </Paper>
  )
}

CollectionShow.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string,
    name_line_1: PropTypes.string,
    name_line_2: PropTypes.string,
    display_page_title: PropTypes.bool,
    image: PropTypes.shape({
      'thumbnail/medium' : PropTypes.shape({
        contentUrl: PropTypes.string,
      }),
    }),
  }).isRequired,
}

export default CollectionShow
