import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  nonFluid: {
    padding: '0 8%',
    position: 'relative',
    marginBottom: '40px',
  },
})

const PageContent = ({ fluidLayout, onClick, onMouseOver, children }) => {
  const classes = useStyles()

  return (
    <Paper
      id='page-content'
      className={!fluidLayout ? classes.nonFluid : null}
      onClick={onClick}
      onMouseOver={onMouseOver}
      square
      elevation={0}
    >
      {children}
    </Paper>
  )
}

PageContent.propTypes = {
  fluidLayout: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  children: PropTypes.node,
}

// each file will export exactly one component
export default PageContent
