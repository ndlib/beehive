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
const PageTitle = require('../../modules/PageTitle.js')

const Search = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
    hits: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    searchTerm: PropTypes.string,
    sortTerm: PropTypes.string,
    facet: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
      PropTypes.object,
      PropTypes.array,
    ]),
    start: PropTypes.number,
    view: PropTypes.string,
    collection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    footerHeight: PropTypes.number,
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
      readyToRender: false,
    }
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    SearchStore.on('SearchStoreChanged', this.searchStoreChanged)
    SearchStore.on('SearchStoreQueryFailed',
      () => {
        if (window.location.hostname !== 'localhost') {
          window.location = window.location.origin + '/404'
        } else {
          alert('404 Redirect prevented')
        }
      },
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
    SearchActions.setSearchTerm('')
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props !== nextProps) {
      if (typeof (nextProps.collection) === 'object') {
        this.setValues(nextProps.collection)
      } else {
        LoadRemote.loadRemoteCollection(nextProps.collection, this.setValues)
      }
      this.searchStoreChanged()
    }
  },

  handleResize: function () {
    this.setState({
      windowHeight: this.calcHeight(),
    })
  },

  calcHeight: function () {
    return window.innerHeight - (this.props.compact ? 0 : this.props.footerHeight)
  },

  searchStoreChanged: function () {
    this.setState({
      readyToRender: true,
    })
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
      this.facetObject(this.props),
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
  facetObject: function (props) {
    let facets
    if (props.facet) {
      facets = []
      for (let i = 0; i < props.facet.length; i++) {
        const facetKey = Object.keys(props.facet[i])[0]
        const facetValue = Object.keys(props.facet[i])[1]
        facets.push({
          name: props.facet[i][facetKey],
          value: props.facet[i][facetValue],
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

    let pageNum = 1
    if (this.props.start > 0) {
      pageNum = Math.floor(this.props.start / SearchStore.rowLimit) + 1
    }

    PageTitle(SearchStore.collection.name_line_1 + ' - Page ' + pageNum)
    return (
      <div>
        {!this.props.compact && <CollectionPageHeader collection={SearchStore.collection} />}
        <SearchControls searchStyle={{ height:'50px' }} />
        <PageContent fluidLayout={false}>
          <SearchDisplayList compact={this.props.compact} />
        </PageContent>
        {!this.props.compact && (
          <CollectionPageFooter collection={SearchStore.collection} height={this.props.footerHeight} />
        )}
      </div>
    )
  },
})

export default Search
