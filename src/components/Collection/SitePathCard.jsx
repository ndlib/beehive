import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardMedia, CardHeader, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import TextOverlay from 'components/Shared/TextOverlay'
import CollectionUrl from 'modules/CollectionUrl.jsx'

const useStyles = makeStyles({
  card: {
    position: 'relative',
    cursor: 'pointer',
    minHeight: '400px',
    height: props => props.fixedSize ? '400px' : 'auto',
  },
  header: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    zIndex: '1',
    display: 'block',
  },
  headerTypography: {
    fontSize: '24px',
    lineHeight: '36px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  media: {
    backgroundImage: props => 'url("' + props.image + '")',
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    height: '400px',
    overflow: 'hidden',
    width: '100%',
  },
  actions: {
    position:'absolute',
    right: '18px',
    top: props => props.hasHeader ? '33px' : '323px',
    zIndex: '2',
  },
})

const SitePathCard = ({ siteObject, addNextButton, fixedSize, headerTitle }) => {
  const image = (siteObject.image && siteObject.image['thumbnail/medium'])
    ? siteObject.image['thumbnail/medium'].contentUrl.replace(new RegExp(' ', 'g'), '%20')
    : '/images/intro.jpg'
  const classes = useStyles({
    fixedSize,
    image,
    hasHeader: !!headerTitle,
  })
  return (
    <Card className={classes.card}>
      <Link to={CollectionUrl.collectionObjectUrl(siteObject)}>
        {headerTitle && (
          <CardHeader
            title={headerTitle}
            classes={{
              root: classes.header,
              title: classes.headerTypography,
            }}
          />
        )}
        <CardMedia className={`collection-site-path-card ${classes.media}`}>
          <TextOverlay title={siteObject.name_line_1 || siteObject.name} subtitle={siteObject.name_line_2} />
        </CardMedia>
      </Link>
      {addNextButton && (
        <CardActions className={classes.actions}>
          <Link to={CollectionUrl.collectionObjectUrl(siteObject)}>
            <IconButton disableRipple>
              <ArrowForwardIcon className='material-icons' />
            </IconButton>
          </Link>
        </CardActions>
      )}
    </Card>
  )
}

SitePathCard.propTypes = {
  siteObject: PropTypes.shape({
    name_line_1: PropTypes.string,
    name_line_2: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.shape({
      'thumbnail/medium': PropTypes.shape({
        contentUrl: PropTypes.string,
      }),
    }),
  }).isRequired,
  addNextButton: PropTypes.bool,
  fixedSize: PropTypes.bool,
  headerTitle: PropTypes.string,
}

SitePathCard.defaultProps = {
  fixedSize: true,
}

export default SitePathCard
