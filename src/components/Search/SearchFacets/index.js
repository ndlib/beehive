import React, { useEffect, useState } from 'react'

import Facet from './Facet'
import SearchStore from 'store/SearchStore'
import ConfigurationStore from 'store/ConfigurationStore'

const SearchFacets = () => {
  // Get the limit for how many of each facet to show from their configuration
  const initialLimits = {}
  ConfigurationStore.facets.forEach(facet => {
    initialLimits[facet.name] = facet.limit || (facet.limit === 0 ? 9999 : 5)
  })

  const [facets, setFacets] = useState(SearchStore.facets)
  const [numVisible, setNumVisible] = useState(initialLimits)

  const sortFacets = (a, b) => {
    return (a.order || 0) - (b.order || 0)
  }

  useEffect(() => {
    const action = () => setFacets(SearchStore.facets)
    SearchStore.on('SearchStoreChanged', action)
    return () => SearchStore.off('SearchStoreChanged', action)
  })

  const onShowAll = (facetName) => {
    setNumVisible({
      ...numVisible,
      [facetName]: 9999,
    })
  }

  return facets ? facets.sort(sortFacets).map(facet => (
    <Facet
      key={facet.field}
      field={facet.field}
      label={facet.name}
      options={facet.values}
      limit={numVisible[facet.field]}
      onShowAll={onShowAll}
    />
  )) : null
}

export default SearchFacets
