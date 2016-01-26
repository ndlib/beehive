'use strict'
import React, { Component, PropTypes } from 'react';

import CollectionIntroduction from '../components/CollectionIntroduction/CollectionIntroduction.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class CollectionIntroductionPage extends Component {

  render() {
    return (
      <CollectionIntroduction
        collection={HoneycombURL() + "/v1/collections/"
          + this.props.params.collectionID + "/showcases"}
      />
    )
  }
}

export default CollectionIntroductionPage;
