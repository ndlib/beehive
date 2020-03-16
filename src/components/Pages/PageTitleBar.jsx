import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseButton from 'other/CloseButton'

const useStyles = makeStyles({
  bar: {
    minHeight: props => props.height + 'px',
    height: props => props.height + 'px',
    opacity: 1,
    backgroundColor: 'rgba(51,51,51,1)',
    zIndex: '1',
  },
  title: {
    lineHeight: props => props.height + 'px',
    color: 'white',
    paddingRight: '16px',
    fontSize: '20px',
    position: 'relative',
  },
})

const PageTitleBar = ({ title, height }) => {
  const classes = useStyles({
    height,
  })
  return (
    <Toolbar id='PageTitleBar' className={`title-bar ${classes.bar}`}>
      <div style={{ float:'left' }}>
        <Typography variant='h2' className={classes.title} noWrap>{title}</Typography>
      </div>
      <CloseButton height={height} />
    </Toolbar>
  )
}

PageTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
}

PageTitleBar.defaultProps = {
  height: 35,
}

export default PageTitleBar
