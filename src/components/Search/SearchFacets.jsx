import React, { useEffect, useState } from 'react'
import { List } from '@material-ui/core'
import ListSubheader from '@material-ui/core/ListSubheader'
import SearchStore from '../../store/SearchStore.js'
import FacetItem from './FacetItem.jsx'

const SearchFacets = () => {
  const [facets, setFacets] = useState(SearchStore.facets)

  useEffect(() => {
    const action = () => setFacets(SearchStore.facets)
    SearchStore.on('SearchStoreChanged', action)
    return () => SearchStore.off('SearchStoreChanged', action)
  })

  return facets ? facets.map(facet => (
    <List key={facet.name}>
      <ListSubheader>{facet.name}</ListSubheader>
      {facet.values ? facet.values.map(valueObj => (
        <FacetItem key={valueObj.name} field={facet.field} facet={valueObj} />
      )) : null}
    </List>
  )) : null
}

export default SearchFacets
