import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CollectionPageHeader from '../../layout/CollectionPageHeader'
import PageContent from '../../layout/PageContent'
import CollectionPageFooter from '../../layout/CollectionPageFooter'
import SearchControls from './SearchControls'
import SearchStore from '../../store/SearchStore'
import SearchActions from '../../actions/SearchActions'
import SearchDisplayList from './SearchDisplayList'
import ConfigurationActions from '../../actions/ConfigurationActions'
import ConfigurationStore from '../../store/ConfigurationStore'
import LoadRemote from '../../modules/LoadRemote'
import PageTitle from '../../modules/PageTitle'

const Search = ({ collection, hits, searchTerm, sortTerm, facet, start, view, footerHeight }) => {
  const [readyToRender, setReadyToRender] = useState(false)
  const [isConfigurationLoaded, setIsConfigurationLoaded] = useState(ConfigurationStore.loaded)

  useEffect(() => {
    // Callback from loadremotecollection when remote collection is loaded
    const setValues = (setCollection) => {
      // Translates the facet option given in props to the structure the SearchStore expects.
      let facets
      if (facet) {
        facets = []
        for (let i = 0; i < facet.length; i++) {
          const facetKey = Object.keys(facet[i])[0]
          const facetValue = Object.keys(facet[i])[1]
          facets.push({
            name: facet[i][facetKey],
            value: facet[i][facetValue],
          })
        }
      }

      ConfigurationActions.load(setCollection)
      SearchActions.loadSearchResults(
        setCollection,
        hits,
        searchTerm,
        facets,
        sortTerm,
        start,
        view,
      )
      return true
    }

    if (typeof (collection) === 'object') {
      setValues(collection)
    } else {
      LoadRemote.loadRemoteCollection(collection, setValues)
    }
  }, [collection, facet, hits, searchTerm, sortTerm, start, view])

  useEffect(() => {
    const configurationLoaded = () => {
      setIsConfigurationLoaded(true)
    }
    ConfigurationStore.addChangeListener(configurationLoaded)
    return () => ConfigurationStore.removeChangeListener(configurationLoaded)
  })

  useEffect(() => {
    const searchStoreChanged = () => {
      if (isConfigurationLoaded) {
        // Update the url to match the new search params whenever the store changes it
        const oldPath = window.location.pathname + window.location.search
        const newPath = SearchStore.searchUri()
        if (newPath !== oldPath) {
          window.history.pushState({ store: SearchStore.getQueryParams() }, '', newPath)
        }
        setReadyToRender(true)
      }
    }
    SearchStore.on('SearchStoreChanged', searchStoreChanged)
    SearchStore.on('SearchStoreViewChanged', searchStoreChanged)
    return () => {
      SearchStore.off('SearchStoreChanged', searchStoreChanged)
      SearchStore.off('SearchStoreViewChanged', searchStoreChanged)
    }
  }, [isConfigurationLoaded])

  useEffect(() => {
    const searchStoreQueryFailed = () => {
      if (window.location.hostname !== 'localhost') {
        window.location = window.location.origin + '/404'
      } else {
        alert('404 Redirect prevented - Check Honeycomb and solr index')
      }
    }
    SearchStore.on('SearchStoreQueryFailed', searchStoreQueryFailed)
    return () => SearchStore.off('SearchStoreQueryFailed', searchStoreQueryFailed)
  })

  useEffect(() => {
    const onWindowPopState = (event) => {
      if (event.state.store) {
        SearchActions.reloadSearchResults(event.state.store)
      }
    }
    window.addEventListener('popstate', onWindowPopState)
    return () => window.removeEventListener('popstate', onWindowPopState)
  })

  // All children of this object expect the collection and all data to be loaded into the SearchStore.
  // This will prevent mounting them until ready.
  if (!readyToRender) {
    return null
  }

  const pageNum = start > 0 ? (Math.floor(start / SearchStore.rowLimit) + 1) : 1
  PageTitle(SearchStore.collection.name_line_1 + ' - Page ' + pageNum)
  return (
    <div>
      <CollectionPageHeader collection={SearchStore.collection} />
      <SearchControls searchStyle={{ height:'50px' }} />
      <PageContent fluidLayout={false}>
        <SearchDisplayList />
      </PageContent>
      <CollectionPageFooter collection={SearchStore.collection} height={footerHeight} />
    </div>
  )
}

Search.propTypes = {
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
  footerHeight: PropTypes.number,
}

Search.defaultProps = {
  footerHeight: 50,
}

export default Search
