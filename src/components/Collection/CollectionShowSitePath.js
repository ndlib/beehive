import React from 'react'
import PropTypes from 'prop-types'
import CollectionIntroCard from './CollectionIntroCard'
import SitePathCardList from './SitePathCardList'

const CollectionShowSitePath = ({ collection }) => {
  const intro = collection.description ? (
    <CollectionIntroCard collection={collection} />
  ) : null
  return collection.site_path ? (
    <SitePathCardList sitePath={collection.site_path} intro={intro} />
  ) : null
}

CollectionShowSitePath.propTypes = {
  collection: PropTypes.shape({
    description: PropTypes.string,
    site_path: PropTypes.array,
  }).isRequired,
}

export default CollectionShowSitePath
