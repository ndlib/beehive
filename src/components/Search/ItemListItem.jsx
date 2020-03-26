import React from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'
import GridItem from './GridItem'

const ItemListItem = (props) => {
  return (props.view === 'list') ? (
    <ListItem item={props.item} {...props} />
  ) : (
    <GridItem item={props.item} {...props} />
  )
}

ItemListItem.propTypes = {
  item: PropTypes.object.isRequired,
  view: PropTypes.string,
}

export default ItemListItem
