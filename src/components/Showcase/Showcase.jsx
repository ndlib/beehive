
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var EventEmitter = require('../../middleware/EventEmitter.js')
var ShowcaseShow = require('./ShowcaseShow.jsx')
var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
var PageContent = require('../../layout/PageContent.jsx')
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
var ConfigurationActions = require('../../actions/ConfigurationActions.js')
var ConfigurationStore = require('../../store/ConfigurationStore.js')
var Loading = require('../../other/Loading.jsx')
var PageTitle = require('../../modules/PageTitle.js')

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

var Showcase = createReactClass({

  getInitialState: function () {
    return {
      showcase: null,
      height: window.innerHeight,
      widht: window.innerWidth,
    }
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  setValues: function (collection) {
    ConfigurationActions.load(collection)
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
      showcase: collection.showcases,
    }, this.handleResize)
    return true
  },

  componentDidMount: function () {
    if (typeof (this.props.collection) === 'object') {
      this.setValues(this.props.collection)
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.setValues)
    }
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.collection !== nextProps.collection) {
      if (typeof (nextProps.collection) === 'object') {
        this.setValues(nextProps.collection)
      } else {
        LoadRemote.loadRemoteCollection(nextProps.collection, this.setValues)
      }
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.handleResize()
    }
  },

  handleResize: function () {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    PageTitle(this.state.showcase.name)
    var showcaseShow
    if (this.state.showcase) {
      showcaseShow = (
        <ShowcaseShow collection={this.state.collection} showcase={this.state.showcase} />
      )
    } else {
      showcaseShow = (<Loading />)
    }
    var header
    if (!BrowserUtils.mobile()) {
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        {header}
        <PageContent fluidLayout>
          {showcaseShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

module.exports = Showcase
