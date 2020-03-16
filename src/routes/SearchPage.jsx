import React from 'react'
import PropTypes from 'prop-types'
import Search from '../components/Search//Search.jsx'
import FacetQueryParms from '../modules/FacetQueryParams.js'
import HoneycombURL from '../modules/HoneycombURL.js'

const SearchPage = ({ match, children }) => {
  const queryParams = new URLSearchParams(window.location.search)
  return (
    <div>
      <Search
        collection={HoneycombURL() + '/v1/collections/' + match.params.collectionID}
        hits={HoneycombURL() + '/v1/collections/' + match.params.collectionID + '/search'}
        searchTerm={queryParams.get('q') || ''}
        sortTerm={queryParams.get('sort')}
        facet={FacetQueryParms()}
        start={parseInt(queryParams.get('start'), 10)}
        view={queryParams.get('view')}
        currentItem={queryParams.get('item')}
      />
      {children}
    </div>
  )
}
SearchPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionID: PropTypes.string,
    }),
  }),
  children: PropTypes.node,
}
export default SearchPage
