import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, IconButton, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Link } from 'react-router-dom'
import TextOverlay from 'components/Shared/TextOverlay'
import HoneycombImage from 'other/HoneycombImage'
import CollectionUrl from 'modules/CollectionUrl'

const useStyles = makeStyles({
  card: {
    position: 'fixed',
    bottom: '60px',
    right: '40px',
    cursor: 'pointer',
    color: '#fff',
    opacity: props => props.hover ? '1.0' : '0.3',
    maxWidth: '200px',
  },
  button: {
    position: 'fixed',
    bottom: '107px',
    right: '40px',
    cursor: 'pointer',
    backgroundColor: '#2c5882',
  },
})

const PreviewLink = ({ siteObject }) => {
  const [hover, setHover] = useState(false)
  const classes = useStyles({
    hover,
  })

  const shouldShow = useMediaQuery('(min-width: 850px)')
  if (!shouldShow) {
    return null
  }

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0
  }
  const url = CollectionUrl.collectionObjectUrl(siteObject)

  return (
    <Link to={url} onClick={scrollToTop}>
      <Card className={classes.card} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
        <CardMedia>
          <HoneycombImage image={siteObject.image} size='small' />
          <TextOverlay title='Continue' />
        </CardMedia>
        <IconButton className={classes.button}>
          <ArrowForwardIcon className='material-icons' />
        </IconButton>
      </Card>
    </Link>
  )
}

PreviewLink.propTypes = {
  siteObject: PropTypes.shape({
    image: PropTypes.object,
  }),
}

export default PreviewLink
