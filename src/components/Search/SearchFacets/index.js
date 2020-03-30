import React, { useEffect, useState } from 'react'

import Facet from './Facet'
import SearchStore from 'store/SearchStore'
import ConfigurationStore from 'store/ConfigurationStore'

const SearchFacets = () => {
  // Get the limit for how many of each facet to show from their configuration
  const initialLimits = {}
  ConfigurationStore.facets.forEach(facet => {
    initialLimits[facet.name] = facet.limit || 5
  })

  const [facets, setFacets] = useState(SearchStore.facets)
  const [numVisible, setNumVisible] = useState(initialLimits)

  useEffect(() => {
    const action = () => setFacets(SearchStore.facets)
    SearchStore.on('SearchStoreChanged', action)
    return () => SearchStore.off('SearchStoreChanged', action)
  })

  const onShowMore = (facetName, increment) => {
    setNumVisible({
      ...numVisible,
      [facetName]: numVisible[facetName] + increment,
    })
  }

  return facets ? facets.map(facet => (
    <Facet
      key={facet.field}
      field={facet.field}
      label={facet.name}
      values={facet.values}
      limit={numVisible[facet.field]}
      onShowMore={onShowMore}
    />
  )) : null
}

export default SearchFacets
