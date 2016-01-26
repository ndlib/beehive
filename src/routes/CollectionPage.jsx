'use strict'
import React, { Component, PropTypes } from 'react';

import Collection from '../components/Collection/Collection.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class CollectionPage extends Component {

  render() {
    return (
      <Collection
        collection={ HoneycombURL() + "/v1/collections/"
          + this.props.params.collectionID  + "/showcases"}
      />
    )
  }
}
export default CollectionPage;
