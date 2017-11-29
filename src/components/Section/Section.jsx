
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var EventEmitter = require('../../middleware/EventEmitter.js')
var SectionShow = require('./SectionShow.jsx')
var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
var PageContent = require('../../layout/PageContent.jsx')
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
var ConfigurationActions = require('../../actions/ConfigurationActions.js')
var ConfigurationStore = require('../../store/ConfigurationStore.js')
var Loading = require('../../other/Loading.jsx')
var PageTitle = require('../../modules/PageTitle.js')

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

var showcaseTitleHeight = 56

var Section = createReactClass({
  propTypes: {
    collection: PropTypes.string,
    section: PropTypes.string,
  },

  getInitialState: function () {
    return {
      collection: null,
      section: null,
      height: window.innerHeight,
    }
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  collectionLoaded: function (collection) {
    ConfigurationActions.load(collection)
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
    }, this.handleResize)
  },

  sectionLoaded: function (result) {
    this.setState({
      remoteSectionLoaded: true,
      section: result.showcases.sections,
    })
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
  },

  componentDidMount: function () {
    LoadRemote.withCallback(this.props.collection, this.collectionLoaded)
    LoadRemote.withCallback(this.props.section, this.sectionLoaded)
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  componentWillReceiveProps: function (nextProps) {
    let sectionLoaded = this.state.remoteSectionLoaded
    let collectionLoaded = this.state.remoteCollectionLoaded
    if (this.props.section !== nextProps.section) {
      LoadRemote.withCallback(nextProps.section, this.sectionLoaded)
      sectionLoaded = false
    }

    if (this.props.collection !== nextProps.collection) {
      LoadRemote.withCallback(nextProps.collection, this.collectionLoaded)
      collectionLoaded = false
    }

    this.setState({
      remoteSectionLoaded: sectionLoaded,
      remoteCollectionLoaded: collectionLoaded,
    })
  },

  handleResize: function () {
    this.setState({
      height: window.innerHeight,
    })
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded || !this.state.remoteSectionLoaded) {
      return null
    }
    PageTitle(this.state.section.name)
    let sectionShow

    if (this.state.section) {
      sectionShow = (
        <SectionShow
          section={this.state.section}
          height={this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight}
          previousSection={this.state.section.previousSection}
          nextSection={this.state.section.nextSection}
          collection={this.state.collection}
        />
      )
    } else {
      sectionShow = (<Loading />)
    }
    var header
    if (!BrowserUtils.mobile()) {
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'inherit' }}>
        {header}
        <PageContent fluidLayout>
          {sectionShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

// each file will export exactly one component
module.exports = Section