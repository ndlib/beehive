import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CollectionUrl from 'modules/CollectionUrl'
import ConfigurationStore from 'store/ConfigurationStore'

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: 'transparent',
    margin: '8px 0',
    alignItems: 'center',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'white',
    textTransform: 'none',
    width: 'auto',
    padding: '0 20px 0 0',
    fontSize: '16px',
    minWidth: 0,
  },
})

const CollectionTabs = ({ collection }) => {
  const classes = useStyles()

  const availableTabs = []
  if (ConfigurationStore.browseEnabled()) {
    availableTabs.push({ label: 'Browse Collection', value: 'search', url: CollectionUrl.browseUrl(collection) })
  }
  if (ConfigurationStore.hasAboutPage()) {
    availableTabs.push({ label: 'About', value: 'about', url: CollectionUrl.aboutUrl(collection) })
  }

  if (!availableTabs.length) {
    return null
  }

  const pageCode = window.location.pathname.split('/').slice(-1)[0].split('?')[0]
  const activeTab = (pageCode === 'search') ? 'search' : (
    window.location.pathname === CollectionUrl.browseUrl(collection) ? 'about' : 'none'
  )

  return (
    <nav className={classes.nav} value={activeTab}>
      {availableTabs.map(tab => (
        <Link key={tab.value} to={tab.url}>
          <button label={tab.label} value={tab.value} className={classes.tab}>
            {tab.label}
          </button>
        </Link>
      ))}
    </nav>
  )
}

CollectionTabs.propTypes = {
  collection: PropTypes.object.isRequired,
}

export default CollectionTabs
