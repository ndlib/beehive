import React from 'react'
import PropTypes from 'prop-types'
import { CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    left: '0px',
    padding: '24px 16px 16px',
    background: 'rgba(0, 0, 0, 0.54)',
  },
  content: {
    margin: '0 8%',
  },
  title: {
    fontSize: props => props.size === 'large' ? '34px' : '24px',
    lineHeight: props => props.size === 'large' ? '46px' : '36px',
    color: 'white',
  },
  subtitle: {
    fontSize: props => props.size === 'large' ? '18px' : '14px',
    color: 'rgba(255,255,255,.8)',
  },
})

const TextOverlay = ({ title, subtitle, size, addMargin }) => {
  const classes = useStyles({
    size,
  })
  if (!title && !subtitle) {
    return null
  }

  return (
    <CardHeader
      classes={{ root: classes.root, content: (addMargin ? classes.content : null) }}
      title={title}
      titleTypographyProps={{
        classes: {
          root: classes.title,
        },
      }}
      subheader={subtitle}
      subheaderTypographyProps={{
        classes: {
          root: classes.subtitle,
        },
      }}
    />
  )
}

TextOverlay.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  addMargin: PropTypes.bool,
  size: PropTypes.oneOf([
    'large',
    'small',
  ]),
}

TextOverlay.defaultProps = {
  size: 'small',
}

export default TextOverlay
