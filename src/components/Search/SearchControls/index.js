import React, { useState, useEffect } from 'react'
import { Toolbar, Button, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'

import FieldSelector from './FieldSelector'
import MatchMode from './MatchMode'
import SearchSort from './SearchSort'
import SearchHelp from './SearchHelp'
import SearchBox from 'layout/SearchBox'

import SearchStore from 'store/SearchStore'
import ConfigurationStore from 'store/ConfigurationStore'
import SearchActions from 'actions/SearchActions'
import CurrentTheme from 'modules/CurrentTheme'

const useStyles = makeStyles({
  container: {
    minHeight: '65px',
    height: '65px',
    width: '100%',
  },
  controls: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'stretch',
    backgroundColor: 'rgba(0,0,0, 0.541176)',
    position: 'fixed',
    zIndex: '2',
    width: '100%',
  },
  leftSide: {
    display: 'flex',
    flexFlow: 'row nowrap',
    flex: '1 1 auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rightSide: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    padding: '0',
  },
  viewButton: {
    backgroundColor: 'rgb(92,92,92)',
    zIndex: '0',
    minWidth: '44px',
    minHeight: '36px',
    borderRadius: '2px',
    padding: '8px',
    '&:hover': {
      backgroundColor: 'rgb(92,92,92)',
    },
  },
  selectedButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
})

const SearchControls = () => {
  const [view, setView] = useState(SearchStore.view)

  useEffect(() => {
    const storeViewChanged = () => {
      setView(SearchStore.view)
    }
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on('SearchStoreViewChanged', storeViewChanged)
    return () => SearchStore.off('SearchStoreViewChanged', storeViewChanged)
  })

  const changeView = (view) => {
    SearchActions.setView(view)
  }

  const classes = useStyles()
  const isSmall = useMediaQuery('(max-width: 799px)')

  return (
    <div className={classes.container}>
      <Toolbar className={`controls ${classes.controls}`}>
        <div className={classes.leftSide}>
          {ConfigurationStore.searchEnabled() && (
            <React.Fragment>
              <FieldSelector />
              <MatchMode />
              <SearchBox primary={false} active useStore />
            </React.Fragment>
          )}
          <SearchHelp />
        </div>
        {!isSmall && (
          <div className={classes.rightSide}>
            <SearchSort />
            <Button
              variant='contained'
              onClick={() => changeView('list')}
              className={classes.viewButton + (view === 'list' ? ` ${classes.selectedButton}` : '')}
            >
              <ViewListIcon
                className='material-icons'
                style={view === 'list' ? CurrentTheme.darkIconStyle() : CurrentTheme.lightIconStyle()}
              />
            </Button>
            <Button
              variant='contained'
              onClick={() => changeView('grid')}
              className={classes.viewButton + (view === 'grid' ? ` ${classes.selectedButton}` : '')}
            >
              <ViewModuleIcon
                className='material-icons'
                style={view === 'grid' ? CurrentTheme.darkIconStyle() : CurrentTheme.lightIconStyle()}
              />
            </Button>
          </div>
        )}
      </Toolbar>
    </div>
  )
}

export default SearchControls
