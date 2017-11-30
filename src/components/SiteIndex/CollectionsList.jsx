import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { GridList } from 'material-ui'
const MediaQuery = require('react-responsive')

const CollectionCard = require('./CollectionCard.jsx')

const CollectionsList = createReactClass({
  displayName: 'Collections List',

  propTypes: {
    collections: PropTypes.array,
  },

  collectionNodes: function () {
    return this.reverseCollection().map(function (collection, index) {
      return (
        <CollectionCard
          collection={collection}
          key={index}
          cardHeight='450'
        />
      )
    })
  },

  reverseCollection: function () {
    let temp = []
    const len = this.props.collections.length
    for (let i = (len - 1); i !== -1; i--) {
      temp.push(this.props.collections[i])
    }
    return temp
  },

  gridList: function (cols) {
    return (
      <GridList cols={cols} cellHeight={'auto'} padding={24}>
        {this.collectionNodes()}
      </GridList>
    )
  },

  render: function () {
    return (
      <div>
        <MediaQuery maxWidth={650}>
          {this.gridList(1)}
        </MediaQuery>
        <MediaQuery minWidth={650} maxWidth={1724}>
          {this.gridList(2)}
        </MediaQuery>
        <MediaQuery minWidth={1724}>
          {this.gridList(3)}
        </MediaQuery>
      </div>
    )
  },
})

module.exports = CollectionsList
