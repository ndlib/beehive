import React from 'react'
import PropTypes from 'prop-types'
import { Paper, useMediaQuery } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CollectionPageFooter = ({ height }) => {
  const shouldShow = useMediaQuery('(min-width: 650px)')
  if (!shouldShow) {
    return null
  }
  return (
    <Paper square style={{ height: height + 'px' }}>
      <footer style={{ height: height + 'px' }}>
        <a href='http://library.nd.edu' className='hesburgh-logo' rel='nofollow'>
          Hesburgh Logo
        </a>
        <Link to='/' className='dec-logo'>
          Dec Logo
        </Link>
      </footer>
    </Paper>
  )
}

CollectionPageFooter.propTypes = {
  height: PropTypes.number,
}

CollectionPageFooter.defaultProps = {
  height: 50,
}

export default CollectionPageFooter
