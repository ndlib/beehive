import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Divider, Drawer, Button, MenuList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NavMenuItem from './NavMenuItem'
import CollectionUrl from 'modules/CollectionUrl'
import CurrentTheme from 'modules/CurrentTheme'
const $ = require('jquery')

const useStyles = makeStyles({
  button: {
    paddingTop: '5px',
    paddingBottom: '5px',
    marginBottom: 0,
    height: 'auto',
    minWidth: 'auto',
    backgroundColor: 'rgba(255,255,255,.1)',
    color: 'white',
    zIndex: '5',
  },
  list: {
    minWidth: '256px',
    maxWidth: '500px',
  },
})

const CollectionLeftNav = ({ collection }) => {
  const [sitePath, setSitePath] = useState(collection.site_path || [])
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (!collection.site_path) {
      const url = collection['@id'] + '/site_path'

      $.ajax({
        context: this,
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {
          setSitePath(result.site_path)
        },
        error: function (request, status, thrownError) {
          // Should we redirect here? It's probably not necessary since it's not
          // the primary content of the page...
          // window.location = window.location.origin + '/404'
          console.log('Error retrieving showcase list ' + thrownError)
        },
      })
    }
  }, [collection])

  const closeDrawer = () => {
    setOpen(false)
  }

  if (!collection) {
    return null
  }

  const introUrl = CollectionUrl.introUrl(collection)
  return (
    <div style={{ marginRight: '8px' }}>
      <Button onClick={() => setOpen(!open)} className={classes.button}>
        <MenuIcon className='material-icons' style={CurrentTheme.lightIconStyle()} />
      </Button>
      <Drawer open={open} onClose={closeDrawer}>
        <MenuList className={classes.list}>
          <NavMenuItem to={CollectionUrl.collectionUrl(collection)} onNavigate={closeDrawer}>Home</NavMenuItem>
          {collection.enable_browse && (
            <NavMenuItem to={CollectionUrl.browseUrl(collection)} onNavigate={closeDrawer}>
              Browse Collection
            </NavMenuItem>
          )}
          {collection.about && (
            <NavMenuItem to={CollectionUrl.aboutUrl(collection)} onNavigate={closeDrawer}>About</NavMenuItem>
          )}
          <Divider />
          {introUrl && (
            <NavMenuItem to={introUrl} onNavigate={closeDrawer}>Introduction</NavMenuItem>
          )}
          {sitePath.map(siteObject => {
            const url = CollectionUrl.collectionObjectUrl(siteObject)
            const name = siteObject.name_line_1 || siteObject.name
            return <NavMenuItem key={siteObject.id} to={url} onNavigate={closeDrawer}>{name}</NavMenuItem>
          })}
        </MenuList>
      </Drawer>
    </div>
  )
}

CollectionLeftNav.propTypes = {
  collection: PropTypes.shape({
    site_path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    about: PropTypes.string,
    enable_browse: PropTypes.bool,
    '@id': PropTypes.string,
  }).isRequired,
}

export default CollectionLeftNav
