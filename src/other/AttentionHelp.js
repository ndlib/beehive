import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  snackbarContent: {
    backgroundColor: 'black',
    opacity: '0.8 !important',
    fontSize: '16px',
    textAlign: 'center',
  },
})

const AttentionHelp = ({ hasScrolled }) => {
  const [elapsed, setElapsed] = useState(false)
  const [open, setOpen] = useState(true)

  // Use a hook for the delay before showing message
  useEffect(() => {
    const tick = () => {
      setElapsed(true)
    }
    const timer = setInterval(tick, 9000)
    return () => clearInterval(timer)
  })

  const classes = useStyles({
    hasScrolled,
  })
  if (!hasScrolled && elapsed && open) {
    return (
      <div id='attentionHelp'>
        <Snackbar autoHideDuration={5000} open={open} onClose={() => setOpen(false)}>
          <SnackbarContent
            message='Scroll left to right to view the showcase.'
            className={classes.snackbarContent}
          />
        </Snackbar>
      </div>
    )
  }
  return null
}

AttentionHelp.propTypes = {
  hasScrolled: PropTypes.bool,
}

export default AttentionHelp
