'use strict'
import React, { Component, PropTypes } from 'react';

import CollectionIntroduction from '../components/CollectionIntroduction/CollectionIntroduction.jsx';

class CollectionIntroductionPage extends Component {

  render() {
    return (
      <CollectionIntroduction
        collection={"http://localhost:3017" + "/v1/collections/"
          + this.props.params.collectionID + "/showcases"}
      />
    )
  }
}

export default CollectionIntroductionPage;
