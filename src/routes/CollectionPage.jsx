import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collection from '../components/Collection/Collection.jsx'
import HoneycombURL from '../modules/HoneycombURL.js'

class CollectionPage extends Component {
  render () {
    return (
      <Collection
        collection={HoneycombURL() + '/v1/collections/' +
          this.props.match.params.collectionID + '/site_path'}
      />
    )
  }
}
CollectionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionID: PropTypes.string,
    }),
  }),
}
export default CollectionPage
