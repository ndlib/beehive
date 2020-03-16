import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import CardCaption from './CardCaption.jsx'

const useStyles = makeStyles({
  title: {
    color: 'lightgrey',
  },
  text: {
    color:'lightgrey',
    paddingTop:'0',
    maxWidth: Math.floor(window.innerWidth * 0.9) + 'px',
    textAlign: 'center',
    fontSize: '120px',
    lineHeight: '120px',
  },
})

const MultimediaCard = ({ section }) => {
  const classes = useStyles()
  return (
    <div className={classes.text}>
      <CardMedia className='img'>
        {section.item.multimedia['@type'] === 'AudioObject' ? (
          <div className={`text ${classes.text}`}>
            <CardHeader title={section.item.multimedia.name} classes={{ title: classes.title }} />
            <CardContent>
              <LibraryMusicIcon className={`material-icons ${classes.text}`} />
            </CardContent>
          </div>
        ) : (
          <img style={{ width: 'auto' }} src={section.item.multimedia.thumbnailUrl} alt='' />
        )}
      </CardMedia>
      <CardCaption caption={section.caption} />
    </div>
  )
}

MultimediaCard.propTypes = {
  section: PropTypes.shape({
    caption: PropTypes.string,
    item: PropTypes.shape({
      multimedia: PropTypes.shape({
        '@type': PropTypes.string,
        thumbnailUrl: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
}

export default MultimediaCard
