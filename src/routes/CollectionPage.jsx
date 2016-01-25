'use strict'
import React, { Component, PropTypes } from 'react';

import Collection from '../components/Collection/Collection.jsx';

class CollectionPage extends Component {

  render() {
    return (
      <Collection
        collection={ "http://localhost:3017" + "/v1/collections/"
          + this.props.params.collectionID  + "/showcases"}
      />
    )
  }
}
export default CollectionPage;
