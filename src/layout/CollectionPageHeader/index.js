import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Paper, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CollectionTabs from './Tabs'
import BrandBar from '../BrandBar'
import CollectionLeftNav from './LeftNav'
import SearchBox from '../SearchBox'
import ConfigurationStore from 'store/ConfigurationStore'
import ConfigurationActions from 'actions/ConfigurationActions'
import CollectionUrl from 'modules/CollectionUrl'

const APP_BAR_HEIGHT = 64
const useStyles = makeStyles(theme => ({
  headerContainer: {
    height: props => APP_BAR_HEIGHT + 1 + `${props.branding ? 50 : 0}px`,
  },
  appBar: {
    background: 'linear-gradient(to bottom, #5b5b5b 0%,#050505 100%)',
    height: APP_BAR_HEIGHT + 1 + 'px',
    top: props => props.branding ? '50px' : '0px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleContainer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0px',
    paddingTop: '0px',
    textDecoration: 'none !important',
    color: '#ffffff',
    marginRight: '8px',
    minWidth: 0,
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
    paddingTop: 0,
    letterSpacing: 0,
    fontSize: 24,
    lineHeight: APP_BAR_HEIGHT + 'px',
    color: theme.palette.common.white,
  },
  leftNav: {
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: APP_BAR_HEIGHT + 'px',
    minWidth: '50px',
  },
  rightNav: {
    display: 'flex',
    flexFlow: 'row nowrap',
    flex: '0 1 auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: APP_BAR_HEIGHT + 'px',
  },
  spacer: {
    flex: '1 1 auto',
  },
  whitespace: {
    width: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    top: APP_BAR_HEIGHT + 'px',
    height: '1px',
    zIndex: '1000',
  },
}))

const CollectionPageHeader = ({ collection, branding, children }) => {
  // eslint-disable-next-line no-unused-vars
  const [configurationLoaded, setConfigurationLoaded] = useState(false)

  useEffect(() => {
    const action = () => setConfigurationLoaded(true)
    ConfigurationStore.addChangeListener(action)
    ConfigurationActions.load(collection)
    return () => ConfigurationStore.removeChangeListener(action)
  }, [collection, setConfigurationLoaded])
  const useSmallStyle = useMediaQuery('(max-width:649px)')
  const classes = useStyles({
    branding: !useSmallStyle && branding,
    useSmallStyle,
  })

  return (
    <Paper square className={classes.headerContainer}>
      {!useSmallStyle && (
        <BrandBar />
      )}
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftNav}>
            <CollectionLeftNav collection={collection} />
            <a href={CollectionUrl.collectionUrl(collection)} className={classes.titleContainer}>
              <h1 className={classes.title}>{collection.name_line_1}</h1>
            </a>
          </div>
          <div className={classes.rightNav}>
            {!useSmallStyle && (
              <CollectionTabs collection={collection} />
            )}
            {ConfigurationStore.searchEnabled() && (
              <SearchBox collection={collection} useStore={false} staticWidth={500} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.whitespace} />
      {children}
    </Paper>
  )
}

CollectionPageHeader.propTypes = {
  collection: PropTypes.shape({
    name_line_1: PropTypes.string,
  }).isRequired,
  branding: PropTypes.bool,
  children: PropTypes.node,
}

export default CollectionPageHeader
