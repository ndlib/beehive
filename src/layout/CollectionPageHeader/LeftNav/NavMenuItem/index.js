import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MenuItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  typography: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
  item: {
    margin: '16px 0px',
    padding: '10px 16px',
  },
})

const NavMenuItem = ({ to, onNavigate, className, children }) => {
  const closeAndScrollTop = () => {
    if (onNavigate) {
      onNavigate()
    }
    document.documentElement.scrollTop = 0
  }

  const classes = useStyles()
  return (
    <Link to={to} onClick={closeAndScrollTop} title={children}>
      <MenuItem className={classes.item + (className ? ` ${className}` : '')}>
        <Typography variant='inherit' className={classes.typography} noWrap>
          {children}
        </Typography>
      </MenuItem>
    </Link>
  )
}

NavMenuItem.propTypes = {
  to: PropTypes.string,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.string,
}

export default NavMenuItem
