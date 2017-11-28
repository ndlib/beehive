import React, { Component } from 'react'

import CollectionIntroduction from '../components/CollectionIntroduction/CollectionIntroduction.jsx'
import HoneycombURL from '../modules/HoneycombURL.js'

class CollectionIntroductionPage extends Component {
  render () {
    return (
      <CollectionIntroduction
        collection={HoneycombURL() + '/v1/collections/' +
          this.props.match.params.collectionID + '/site_path'}
      />
    )
  }
}

export default CollectionIntroductionPage
