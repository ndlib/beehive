import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router-dom'
import { Divider, ListItem } from 'material-ui'
const ItemImage = require('./ItemImage.jsx')
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

const MyListItem = createReactClass({
  propTypes: {
    item: PropTypes.object.isRequired,
  },

  leftIcon: function () {
    return (
      <div style={{ top: '4px', left: '16px', padding: '2px', width: '77px', height: '75px', margin: '0 12px' }}>
        <ItemImage item={this.props.item} />
      </div>
    )
  },

  primaryText: function () {
    return (
      <span style={{ marginLeft: '30px', display: 'inline-block' }}>
        {this.props.item.name}
      </span>
    )
  },

  secondaryText: function () {
    return (
      <span style={{ maxWidth: '50em', marginLeft: '30px' }}>
        { this.props.item.description }
      </span>
    )
  },

  manifestIcon: function (item) {
    if (item.metadata && item.metadata.manuscript_url) {
      return (<img
        src='/images/pt.icon.drk.png'
        className='manuscript-icon'
        alt='Manifest Available'
        title='Manifest Available'
      />)
    }
    return null
  },

  render: function () {
    return (
      <Link to={CollectionUrl.itemObjectUrl(this.props.item)}>
        <ListItem
          leftIcon={this.leftIcon()}
          primaryText={this.primaryText()}
          secondaryText={this.secondaryText()}
          secondaryTextLines={2}
          innerDivStyle={{ paddingLeft:'80px', height:'85px' }}
          rightIcon={this.manifestIcon(this.props.item)}
        />
        <Divider style={{ marginLeft: '110px' }} />
      </Link>
    )
  },
})

module.exports = MyListItem
