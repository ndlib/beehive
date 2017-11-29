import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardMedia } from 'material-ui'
var ItemImage = require('./ItemImage.jsx')

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var GridItem = createReactClass({
  propTypes: {
    item: PropTypes.object.isRequired,
  },

  mediaOverlay: function () {
    var name = (
      <span style={{ fontFamily: 'GPCMed' }}>
        { this.props.item.name }
      </span>
    )
    return (<CardTitle title={name} />)
  },

  cardMedia: function () {
    return (
      <CardMedia overlay={this.mediaOverlay()}>
        <ItemImage item={this.props.item} />
      </CardMedia>
    )
  },

  manifestIcon: function (item) {
    if (item.metadata && item.metadata.manuscript_url) {
      return (<img src='/images/pt.icon.drk.png' className='manuscript-icon' alt='Manifest Available' title='Manifest Available' style={{ position: 'absolute', right: '0', top: '0', maxWidth: '15%' }} />)
    }
    return null
  },

  render: function () {
    return (
      <Link to={CollectionUrl.itemObjectUrl(this.props.item)}>
        <Card
          style={{ cursor: 'pointer', position: 'relative' }}
        >

          { this.cardMedia() }
          {this.manifestIcon(this.props.item)}
        </Card>
      </Link>
    )
  },
})

module.exports = GridItem
