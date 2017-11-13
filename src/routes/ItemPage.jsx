'use strict'
import React, { Component, PropTypes } from 'react';

import Item from '../components/Item/Item.jsx';
import CollectionUrl from '../modules/CollectionUrl.jsx'

class ItemPage extends Component {

  render() {
    return (
      <div>
        <Item
          item={ CollectionUrl.remoteItem(this.props.params.itemID) }
          collection={ CollectionUrl.remoteCollection(this.props.params.collectionID) }
        />
        {this.props.children}
      </div>
    )
  }
}

export default ItemPage;
