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
    let orderA = 0
    let orderB = 0
    const matchA = ConfigurationStore.facets.find(cfg => cfg.name === a.field)
    if (matchA) {
      orderA = matchA.order || 0
    }
    const matchB = ConfigurationStore.facets.find(cfg => cfg.name === b.field)
    if (matchB) {
      orderB = matchB.order || 0
    }
    return orderA - orderB
  }

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

  return facets ? facets.sort(sortFacets).map(facet => (
    <Facet
      key={facet.field}
      field={facet.field}
      label={facet.name}
      options={facet.values}
      limit={numVisible[facet.field]}
      onShowMore={onShowMore}
    />
  )) : null
}

export default SearchFacets
