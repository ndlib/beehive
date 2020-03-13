import React from 'react'
import createReactClass from 'create-react-class'
import { Toolbar, Button } from '@material-ui/core'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import MediaQuery from 'react-responsive'
const SearchBox = require('../../layout/SearchBox.jsx')
const SearchSort = require('./SearchSort.jsx')
const SearchStore = require('../../store/SearchStore.js')
const ConfigurationStore = require('../../store/ConfigurationStore.js')
const SearchActions = require('../../actions/SearchActions.js')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')
const SearchHelp = require('./SearchHelp.jsx')

const SearchControls = createReactClass({
  getInitialState: function () {
    const state = {
      view: SearchStore.view,
    }
    return state
  },

  controlsStyle: function () {
    return {
      backgroundColor: 'rgba(0,0,0, 0.541176)',
      position: 'fixed',
      minHeight: '65px',
      zIndex: '2',
      width: '100%',
    }
  },

  toggleView: function () {
    if (this.state.view === 'grid') {
      this.setList()
    } else if (this.state.view === 'list') {
      this.setGrid()
    }
  },

  setGrid: function () {
    this.storeView('grid')
  },

  setList: function () {
    this.storeView('list')
  },

  checkView: function (view) {
    if (view === 'list' || view === 'grid') {
      return true
    }
    return false
  },

  componentWillMount: function () {
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on('SearchStoreViewChanged', this.storeViewChanged)
  },

  storeView: function (view) {
    SearchActions.setView(view)
  },

  storeChanged: function () {
    this.setState({ view: SearchStore.view })
  },

  storeViewChanged: function () {
    this.setState({ view: SearchStore.view })
    const url = window.location.origin + SearchStore.searchUri()
    window.history.pushState({ store: SearchStore.getQueryParams() }, '', url)
  },

  searchBox: function () {
    if (ConfigurationStore.searchEnabled()) {
      return (<SearchBox primary={false} active useStore />)
    } else {
      return null
    }
  },

  render: function () {
    return (
      <div style={{ height: '65px', width: '100%' }}>
        <Toolbar
          className='controls'
          style={this.controlsStyle()}
        >
          <div style={{ float: 'left' }}>
            {this.searchBox()}
            <SearchHelp />
          </div>
          <div style={{ float: 'right' }}>
            <MediaQuery minWidth={700}>
              <SearchSort />
              <Button
                variant='contained'
                backgroundColor={this.state.view === 'grid' ? 'rgba(0, 0, 0, 0.64)' : 'white'}
                onClick={this.setList}
                style={{ zIndex: '0', margin: '15px 0', minWidth: '44px', lineHeight: '36px' }}
                disableRipple
              >
                <ViewListIcon
                  className='material-icons'
                  style={this.state.view === 'grid' ? CurrentTheme.lightIconStyle() : CurrentTheme.darkIconStyle()}
                />
              </Button>
              <Button
                variant='contained'
                backgroundColor={this.state.view === 'list' ? 'rgba(0, 0, 0, 0.64)' : 'white'}
                onClick={this.setGrid}
                style={{ zIndex: '0', margin: '15px 0', minWidth: '44px', lineHeight: '36px' }}
                disableRipple
              >
                <ViewModuleIcon
                  className='material-icons'
                  style={this.state.view === 'list' ? CurrentTheme.lightIconStyle() : CurrentTheme.darkIconStyle()}
                />
              </Button>
            </MediaQuery>
          </div>
        </Toolbar>
      </div>
    )
  },
})

export default SearchControls
