import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MetadataList from '../display/MetadataList'

const useStyles = makeStyles({
  // The outer containing div for this component
  outer: {
    boxShadow: '0 -5px 5px -5px rgba(0, 0, 0, 0.16), 0 -5px 5px -5px rgba(0, 0, 0, 0.23)',
    margin: '0 auto',
    paddingBottom: '10px',
    position: 'relative',
    width: '100%',
    zIndex: 0,
  },
  // The details Paper
  details: {
    backgroundColor: '#fff',
    color: '#555',
    display: 'block',
    fontSize: '16px',
    padding: '10px',
    paddingTop: '35px',
    opacity: '0.8',
    margin: '0 auto',
    width: '100%',
    maxWidth: '60em',
  },
})

const Details = ({ item, additionalDetails, showDetails, printable }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.outer}>
      {showDetails && (
        <div className={`item-details ${classes.details}`}>
          <div className='additional-details' dangerouslySetInnerHTML={{ __html: additionalDetails }} />
          <MetadataList metadata={item.metadata} id={item.id} printable={printable} />
        </div>
      )}
    </Paper>
  )
}

Details.propTypes = {
  item: PropTypes.object,
  additionalDetails: PropTypes.string,
  showDetails: PropTypes.bool,
  printable: PropTypes.bool,
}

Details.defaultProps = {
  showDetails: true,
  printable: true,
}

export default Details
