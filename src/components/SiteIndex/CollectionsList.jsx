import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GridList } from '@material-ui/core'
import MediaQuery from 'react-responsive'

import CollectionCard from './CollectionCard.jsx'

const reverseComponents = (components) => {
  const temp = []
  const len = components.length
  for (let i = (len - 1); i !== -1; i--) {
    temp.push(components[i])
  }
  return temp
}

class CollectionsList extends Component {
  constructor(props) {
    super(props)
    this.gridList = this.gridList.bind(this)
  }

  gridList(cols) {
    return (
      <GridList cols={cols} cellHeight='auto' padding={24}>
        {reverseComponents(this.props.collections).map((collection) => (
          <CollectionCard
            collection={collection}
            key={collection['@id']}
            cardHeight='450'
          />
        ))}
      </GridList>
    )
  }

  render() {
    return (
      <div>
        <MediaQuery maxWidth={650}>
          {this.gridList(1)}
        </MediaQuery>
        <MediaQuery minWidth={651} maxWidth={1724}>
          {this.gridList(2)}
        </MediaQuery>
        <MediaQuery minWidth={1725}>
          {this.gridList(3)}
        </MediaQuery>
      </div>
    )
  }
}

CollectionsList.propTypes = {
  collections: PropTypes.array,
}

export default CollectionsList
