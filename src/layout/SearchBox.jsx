import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { IconButton, Button, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import SearchStore from '../store/SearchStore.js'
import SearchActions from '../actions/SearchActions.js'
import CurrentTheme from '../modules/CurrentTheme.jsx'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '14px 0',
    flex: '1 1 auto',
    maxWidth: '550px',
  },
  searchTextField: {
    height: '38px',
    maxWidth: '500px',
    width: props => props.staticWidth || undefined,
    verticalAlign:'top',
    paddingRight: '50px',
    color: 'black',
    flex: '1 1 500px',
  },
  searchButton: {
    zIndex: '0',
    minWidth: 'auto',
    boxShadow: 'none',
    lineHeight: '36px',
    width: '50px',
    height: '38px',
    backgroundColor: '#666666',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: '#666666',
    },
  },
  clearButton: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    marginLeft: '-41px',
    height: '25px',
    width: '40px',
    verticalAlign: 'text-bottom',
    fontSize: '16px',
    paddingTop: '6px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  clearIcon: {
    color: 'gray',
  },
})

const SearchBox = ({ collection, useStore, active, staticWidth }) => {
  const history = useHistory()
  const searchParams = new URLSearchParams(history.location.search)
  const defaultTerm = SearchStore.searchTerm || searchParams.get('q')
  const [isActive, setIsActive] = useState(active)
  const [searchTerm, setSearchTerm] = useState(defaultTerm)
  const [lastSearched, setLastSearched] = useState(defaultTerm)
  const classes = useStyles({
    staticWidth,
  })

  const onClick = () => {
    if (isActive) {
      if (searchTerm !== lastSearched) {
        performSearch()
      } else if (!searchTerm) {
        setIsActive(false)
      }
    } else {
      setIsActive(true)
    }
  }

  const performSearch = (e, term) => {
    if (e) {
      e.preventDefault()
    }
    const newTerm = term !== undefined ? term : searchTerm
    setSearchTerm(newTerm)
    setLastSearched(newTerm)

    if (useStore) {
      SearchActions.setSearchTerm(newTerm)
    } else {
      const relativePath = `/${collection.id}/${collection.slug}/search?q=${newTerm}`
      window.location.assign(`${window.location.origin}${relativePath}`)
    }
  }

  return (
    <form className={classes.container} onSubmit={performSearch}>
      {isActive && (
        <input
          placeholder='search'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className={classes.searchTextField}
        />
      )}
      {SearchStore.searchTerm && isActive && (
        <Tooltip title='Clear Search'>
          <IconButton onClick={() => performSearch(null, '')} className={classes.clearButton}>
            <ClearIcon className={`material-icons ${classes.clearIcon}`} />
          </IconButton>
        </Tooltip>
      )}
      <Button
        variant='contained'
        onClick={onClick}
        className={classes.searchButton}
        disableRipple
      >
        <SearchIcon className='material-icons' style={CurrentTheme.lightIconStyle()} />
      </Button>
    </form>
  )
}

SearchBox.propTypes = {
  collection: PropTypes.object,
  useStore: PropTypes.bool,
  active: PropTypes.bool,
  staticWidth: PropTypes.number,
}

SearchBox.defaultProps = {
  useStore: true,
}

export default SearchBox
