import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const ListItem = require('./ListItem.jsx')
const GridItem = require('./GridItem.jsx')
const $ = require('jquery')

const ItemListItem = createReactClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    view: PropTypes.string,
  },

  getInitialState: function () {
    return {
      fullItem: {},
      itemLoaded: false,
    }
  },

  componentWillMount: function () {
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
  },

  render: function () {
    if (this.props.view === 'list') {
      return (
        <ListItem
          item={this.state.itemLoaded ? Object.assign(this.props.item, this.state.fullItem) : this.props.item} />
      )
    } else {
      return (
        <GridItem
          item={this.state.itemLoaded ? Object.assign(this.props.item, this.state.fullItem) : this.props.item} />
      )
    }
  },
})

module.exports = ItemListItem
