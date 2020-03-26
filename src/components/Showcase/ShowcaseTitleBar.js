import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseButton from '../../other/CloseButton'

const useStyles = makeStyles({
  toolbar: {
    opacity: props => 1 - props.percentFade,
    backgroundColor: 'rgba(51, 51, 51, 1)',
    height: props => `${props.height}px`,
    zIndex: '200',
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    lineHeight: props => `${props.height}px`,
    fontSize: '20px',
  },
})

const ShowcaseTitleBar = ({ showcase, percentFade, height }) => {
  const classes = useStyles({
    percentFade,
    height,
  })

  if (!showcase) {
    return null
  }

  return (
    <Toolbar className={`title-bar ${classes.toolbar}`}>
      <Typography variant='h2' className={classes.title}>{showcase.name_line_1}</Typography>
      <CloseButton height={height} />
    </Toolbar>
  )
}

ShowcaseTitleBar.propTypes = {
  showcase: PropTypes.shape({
    name_line_1: PropTypes.string,
  }).isRequired,
  percentFade: PropTypes.number,
  height: PropTypes.number,
}

ShowcaseTitleBar.defaultProps = {
  percentFade: 0,
  height: 35,
}

export default ShowcaseTitleBar
