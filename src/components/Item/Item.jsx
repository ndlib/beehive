
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var EventEmitter = require('../../middleware/EventEmitter.js')
var ItemShow = require('./ItemShow.jsx')
var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
var PageContent = require('../../layout/PageContent.jsx')
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
var ConfigurationActions = require("../../actions/ConfigurationActions.js")
var ConfigurationStore = require("../../store/ConfigurationStore.js")
var Loading = require("../../other/Loading.jsx")
var PageTitle = require("../../modules/PageTitle.js")

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

var showcaseTitleHeight = 56

var Item = createReactClass({
  propTypes: {
    collection: PropTypes.string,
    item: PropTypes.string,
  },

  getInitialState: function() {
    return {
      collection: null,
      item: null,
      height: window.innerHeight,
    }
  },

  configurationLoaded: function(){
    this.setState({ configurationLoaded: true })
  },

  collectionLoaded: function(collection) {
    ConfigurationActions.load(collection)
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
    }, this.handleResize)
  },

  itemLoaded: function(result) {
    this.setState({
      remoteItemLoaded: true,
      item: result.items,
    })
  },

  componentWillMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    var newMuiTheme = this.state.muiTheme
    newMuiTheme.paper.backgroundColor = 'inherit'

    this.setState({
      muiTheme: newMuiTheme,
    })
  },

  componentWillUnmount: function() {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
    window.removeEventListener('resize', this.handleResize)
  },

  componentDidMount: function() {
    LoadRemote.withCallback(this.props.collection, this.collectionLoaded.bind(this))
    LoadRemote.withCallback(this.props.item, this.itemLoaded.bind(this))
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillReceiveProps: function(nextProps) {
    let itemLoaded = this.state.remoteItemLoaded
    let collectionLoaded = this.state.remoteCollectionLoaded
    if(this.props.item !== nextProps.item) {
      LoadRemote.withCallback(nextProps.item, this.itemLoaded.bind(this))
      itemLoaded = false
    }

    if (this.props.collection !== nextProps.collection) {
      LoadRemote.withCallback(nextProps.collection, this.collectionLoaded.bind(this))
      collectionLoaded = false
    }

    this.setState({
      remoteItemLoaded: itemLoaded,
      remoteCollectionLoaded: collectionLoaded,
    })
  },

  handleResize: function() {
    this.setState({
      height: window.innerHeight
    })
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded || !this.state.remoteItemLoaded) {
      return null
    }
    PageTitle(this.state.item.name)
    let itemShow

    if (this.state.item) {
      itemShow = (
        <ItemShow
          item={this.state.item}
          height={this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight}
        />
      )
    } else {
      itemShow = (<Loading />)
    }
    var header
    if(!BrowserUtils.mobile()){
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'inherit' }}>
        {header}
        <PageContent fluidLayout={true}>
          {itemShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  }
})

// each file will export exactly one component
module.exports = Item
