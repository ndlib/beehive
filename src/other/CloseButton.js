import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import { Link } from 'react-router-dom'
import SearchStore from '../store/SearchStore'

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: props => props.darkIcon ? theme.palette.common.black : theme.palette.common.white,
  },
  icon: {
    border: 'solid 1px',
    verticalAlign: 'middle',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
    height: '100%',
    padding: '0',
  },
}))

const CloseButton = ({ href, darkIcon }) => {
  // generate what the back location url is
  const destination = href || (() => {
    const current = window.location.pathname
    let stopword

    // this should bring us up 1 level. eg section=>showcase showcase=>collection
    if (current.includes('/items/')) {
      if (SearchStore.collection) {
        return SearchStore.searchUri()
      }
      stopword = 'items'
    } else if (current.includes('/pages/')) {
      stopword = 'pages'
    } else if (current.includes('/sections/')) {
      stopword = 'sections'
    } else if (current.includes('/showcases/')) {
      stopword = 'showcases'
    } else {
      return '/'
    }

    const re = RegExp(`((?:\/[^\/]+)+)\/${stopword}`) // eslint-disable-line no-useless-escape
    return re.exec(current)[1]
  })()

  const classes = useStyles({
    darkIcon,
  })
  return (
    <Link to={destination} className={classes.container}>
      <Button className={classes.closeButton}>
        <ClearIcon className={`material-icons ${classes.icon}`} />
      </Button>
    </Link>
  )
}

CloseButton.propTypes = {
  href: PropTypes.string,
  darkIcon: PropTypes.bool,
}

export default CloseButton
