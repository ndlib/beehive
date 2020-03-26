import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddReferral from '../../modules/AddReferral'
import Details from '../../display/Details'
import OpenseadragonViewer from '../../display/OpenseadragonViewer'
import MultimediaViewer from '../../layout/MultimediaViewer'

const useStyles = makeStyles({
  outer: {
    height: props => props.propHeight,
    position: 'relative',
    overflow: 'auto',
  },
  zoom: {
    background: '#444',
    top: 0,
    width: '100%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: props => `${props.calcHeight - 60}px`,
    display: 'block',
    margin: 'auto',
  },
  toggleButton: {
    display: 'block',
    margin: 'auto',
    color: '#fff',
    fontSize: '14px',
  },
})

const ItemContent = ({ item, additionalDetails, height, minMediaHeight, mediaBottom }) => {
  const [zoom, setZoom] = useState(false)

  const calcHeight = zoom ? window.innerHeight : Math.max(height - mediaBottom, minMediaHeight)
  const classes = useStyles({
    propHeight: height,
    calcHeight: calcHeight,
  })

  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => document.body.classList.toggle('noscroll', false)
  })

  const hasManuscript = (item && item.metadata && item.metadata.manuscript_url)
  const manuscriptButton = (hasManuscript) ? (
    <div style={{ background: '#444' }}>
      <Button
        onClick={(event) => {
          event.preventDefault()
          window.open(AddReferral(item.metadata.manuscript_url.values[0].value))
        }}
        className={classes.toggleButton}
      >
        View Manuscript
      </Button>
    </div>
  ) : null

  const showNavigator = useMediaQuery('(min-width: 650px)')
  const isValidMedia = (item && item.media != null &&
    ['ImageObject', 'AudioObject', 'VideoObject'].includes(item.media['@type'])
  )
  return (
    <div className={height ? classes.outer : null}>
      {isValidMedia ? (
        <div className={`item-detail-zoom ${height ? classes.zoom : ''}`}>
          {item.media['@type'] === 'ImageObject' ? (
            <React.Fragment>
              {zoom ? (
                <OpenseadragonViewer
                  image={item.media}
                  containerID={item.id}
                  height={calcHeight - 145}
                  toolbarTop={60}
                  toolbarLeft={40}
                  showFullPageControl={false}
                  showNavigator={showNavigator}
                />
              ) : (
                <img src={item.media.contentUrl} className={classes.image} alt='' />
              )}
              {hasManuscript ? manuscriptButton : (
                item.media['@type'] === 'ImageObject' && (
                  <div style={{ background: '#444' }}>
                    <Button onClick={() => setZoom(!zoom)} className={classes.toggleButton}>
                      Toggle Zoom
                    </Button>
                  </div>
                )
              )}
            </React.Fragment>
          ) : (
            <MultimediaViewer
              url={item.media.embedUrl}
              autostart={false}
              height={item.media['@type'] !== 'AudioObject' ? (calcHeight + 'px') : undefined}
            />
          )}
        </div>
      ) : (
        manuscriptButton
      )}
      {!zoom && (
        <Details item={item} additionalDetails={additionalDetails} showDetails />
      )}
    </div>
  )
}

ItemContent.propTypes = {
  item: PropTypes.object,
  additionalDetails: PropTypes.string,
  height: PropTypes.number.isRequired,
  minMediaHeight: PropTypes.number,
  // If splitting the space between media and meta
  // causes the media to go smaller than this, it
  // will switch to full screen media render
  mediaBottom: PropTypes.number,
  // Distance from bottom of media to bottom of viewport
}

ItemContent.defaultProps = {
  minMediaHeight: 300,
  mediaBottom: 200,
}

export default ItemContent
