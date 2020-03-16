import React from 'react'
import PropTypes from 'prop-types'
import { Paper, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  header: {
    maxWidth: '80%',
    margin: '36px auto !important',
    textAlign: 'center',
  },
  paper: {
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    borderRadius: '2px',
    width: props => props.isNarrow ? '100%' : '70%',
    margin: props => props.isNarrow ? '0px' : '0px auto',
    padding: '2rem',
    overflow: 'hidden',
  },
  content: {
    fontSize: '16px',
    maxWidth: '32.5em', // Should put it between 70-75 characters at 1em (16px)
    margin: props => props.isNarrow ? '0px' : '0px auto 60px',
  },
})

const PagesShow = ({ title, content, children }) => {
  const isWide = useMediaQuery('(min-width: 1400px)')
  const isNarrow = useMediaQuery('(max-width: 999px)')
  const classes = useStyles({
    isNarrow,
    isWide,
  })

  return (
    <div id='page-show'>
      <Paper className={`essay-content ${classes.paper}`}>
        {title && (
          <h2 className={classes.header}>{title}</h2>
        )}
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </Paper>
    </div>
  )
}

PagesShow.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  children: PropTypes.node,
}

export default PagesShow
