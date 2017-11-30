import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardMedia, CardTitle, FloatingActionButton, FontIcon } from 'material-ui'
import { Link } from 'react-router-dom'
const HoneycombImage = require('../other/HoneycombImage.jsx')
const MediaQuery = require('react-responsive')
const CollectionUrl = require('../modules/CollectionUrl.jsx')

const PreviewLink = createReactClass({
  propTypes: {
    siteObject: PropTypes.object,
  },

  getInitialState: function () {
    return {
      hover: false,
    }
  },

  mouseOver: function () {
    this.setState({ hover: true })
  },

  mouseOut: function () {
    this.setState({ hover: false })
  },

  style: function () {
    return {
      position: 'fixed',
      bottom: '60px',
      right: '40px',
      cursor: 'pointer',
      color: '#fff',
      opacity: this.state.hover ? '1.0' : '0.3',
      maxWidth: '200px',
    }
  },

  buttonStyle: function () {
    return {
      position: 'fixed',
      bottom: '107px',
      right: '40px',
      cursor: 'pointer',
    }
  },

  getCard: function (media) {
    return (
      <Card style={this.style(media)} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
        <CardMedia overlay={<CardTitle title='Continue' />}>
          <HoneycombImage image={this.props.siteObject.image} size='small' />
        </CardMedia>
        <FloatingActionButton
          backgroundColor='#2c5882'
          style={this.buttonStyle()}
        >
          <FontIcon className='material-icons'>arrow_forward</FontIcon>
        </FloatingActionButton>
      </Card>

    )
  },

  scrollToTop: function () {
    document.documentElement.scrollTop = 0
  },

  render: function () {
    const url = CollectionUrl.collectionObjectUrl(this.props.siteObject)
    return (
      <Link
        to={url}
        onClick={this.scrollToTop}
      >
        <MediaQuery minWidth={850}>
          <MediaQuery minWidth={1500}>
            { this.getCard('wide') }
          </MediaQuery>
          <MediaQuery maxWidth={1500}>
            { this.getCard('narrow') }
          </MediaQuery>
        </MediaQuery>
      </Link>
    )
  },
})

module.exports = PreviewLink
