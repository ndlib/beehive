
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var ListItem = require('./ListItem.jsx')
var GridItem = require('./GridItem.jsx')

var ItemListItem = createReactClass({
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
      error: function (request, status, thrownError) {},
    })
  },

  render: function () {
    if (this.props.view === 'list') {
      return (
        <ListItem item={this.state.itemLoaded ? Object.assign(this.props.item, this.state.fullItem) : this.props.item} />
      )
    } else {
      return (
        <GridItem item={this.state.itemLoaded ? Object.assign(this.props.item, this.state.fullItem) : this.props.item} />
      )
    }
  },
})

// each file will export exactly one component
module.exports = ItemListItem
