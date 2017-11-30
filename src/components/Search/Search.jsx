import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const SearchControls = require('./SearchControls.jsx')
const SearchStore = require('../../store/SearchStore.js')
const SearchActions = require('../../actions/SearchActions.js')
const SearchDisplayList = require('./SearchDisplayList.jsx')
const ConfigurationActions = require('../../actions/ConfigurationActions.js')
const ConfigurationStore = require('../../store/ConfigurationStore.js')
const LoadRemote = require('../../modules/LoadRemote.jsx')

const Search = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
    hits: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    searchTerm: PropTypes.string,
    sortTerm: PropTypes.string,
    facet: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    start: PropTypes.number,
    view: PropTypes.string,
    collection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  },

  getDefaultProps: function () {
    return {
      compact: false,
      footerHeight: 50,
    }
  },

  getInitialState: function () {
    return {
      windowHeight: this.calcHeight(),
      collection: {},
      remoteCollectionLoaded: false,
    }
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    SearchStore.on('SearchStoreChanged', this.searchStoreChanged)
    SearchStore.on('SearchStoreQueryFailed',
      function (result) {
        window.location = window.location.origin + '/404'
      }
    )
    window.addEventListener('popstate', this.onWindowPopState)

    if (typeof (this.props.collection) === 'object') {
      this.setValues(this.props.collection)
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.setValues)
    }
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('popstate', this.onWindowPopState)
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  handleResize: function () {
    this.setState({
      windowHeight: this.calcHeight(),
    })
  },

  calcHeight: function () {
    return window.innerHeight - (this.props.compact ? 0 : this.props.footerHeight)
  },

  searchStoreChanged: function (reason) {
    this.setState({
      readyToRender: true,
    })

    // if(reason === "load") {
    //   let path = window.location.origin + SearchStore.searchUri() + currentItem
    //   path += "&compact=" + this.props.compact
    //   window.history.replaceState({ store: SearchStore.getQueryParams() }, '', path)

    // }
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  // Callback from loadremotecollection when remote collection is loaded
  setValues: function (collection) {
    ConfigurationActions.load(collection)
    SearchActions.loadSearchResults(
      collection,
      this.props.hits,
      this.props.searchTerm,
      this.facetObject(),
      this.props.sortTerm,
      this.props.start,
      this.props.view)
    return true
  },

  onWindowPopState: function (event) {
    if (event.state.store) {
      SearchActions.reloadSearchResults(event.state.store)
    }
  },

  // Translates the facet option given in props to the structure the SearchStore expects.
  facetObject: function () {
    let facets
    if (this.props.facet) {
      facets = []
      for (let i = 0; i < this.props.facet.length; i++) {
        const facetKey = Object.keys(this.props.facet[i])[0]
        const facetValue = Object.keys(this.props.facet[i])[1]
        facets.push({
          name: this.props.facet[i][facetKey],
          value: this.props.facet[i][facetValue],
        })
      }
    }
    return facets
  },

  render: function () {
    // All children of this object expect the collection and all data to be loaded into the SearchStore.
    // This will prevent mounting them until ready.
    if (!this.state.readyToRender) {
      return null
    }

    return (
      <div>
        { !this.props.compact && <CollectionPageHeader collection={SearchStore.collection} /> }
        <SearchControls searchStyle={{ height:'50px' }} />
        <PageContent fluidLayout={false}>
          <SearchDisplayList compact={this.props.compact} />
        </PageContent>
        { !this.props.compact && <CollectionPageFooter collection={SearchStore.collection} height={this.props.footerHeight} /> }
      </div>
    )
  },
})

module.exports = Search
