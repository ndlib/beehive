import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem.jsx'
import GridItem from './GridItem.jsx'

const ItemListItem = (props) => {
  const [fullItem, setFullItem] = useState() // eslint-disable-line no-unused-vars
  const [itemLoaded, setItemLoaded] = useState(false) // eslint-disable-line no-unused-vars

  // Removed because this is SLOW, since it gets called for every item on the results page. As a side-effect, we
  // cannot display the "manuscript available" icon until honeycomb and/or beehive is refactored.
  /*
  $.ajax({
    context: this,
    type: 'GET',
    url: this.props.item['@id'],
    dataType: 'json',
    success: function (result) {
      this.setState(
        {
          fullItem: result.items,
          itemLoaded: true,
        }
      )
    },
    error: function (request, status, thrownError) {
      console.log(thrownError)
    },
  })
  */

  return (props.view === 'list') ? (
    <ListItem item={itemLoaded ? Object.assign(props.item, fullItem) : props.item} {...props} />
  ) : (
    <GridItem item={itemLoaded ? Object.assign(props.item, fullItem) : props.item} {...props} />
  )
}

ItemListItem.propTypes = {
  item: PropTypes.object.isRequired,
  view: PropTypes.string,
}

export default ItemListItem
