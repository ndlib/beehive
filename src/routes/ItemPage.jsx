'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Item from '../components/Item/Item.jsx'
import CollectionUrl from '../modules/CollectionUrl.jsx'

class ItemPage extends Component {

  render() {
    return (
      <div>
        <Item
          item={ CollectionUrl.remoteItem(this.props.match.params.itemID) }
          collection={ CollectionUrl.remoteCollection(this.props.match.params.collectionID) }
        />
        {this.props.children}
      </div>
    )
  }
}

export default ItemPage
