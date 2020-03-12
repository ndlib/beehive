import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardActions, CardMedia, CardText, CardTitle, FlatButton } from 'material-ui'
import { Link } from 'react-router-dom'
const $ = require('jquery')
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

const CollectionCard = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
    headerTitle: PropTypes.string,
  },

  style: function () {
    return {
      position: 'relative',
      cursor: 'pointer',
      maxHeight:'450px',
      // padding: theme.spacing.desktopGutter,
      height:'100%',
      paddingBottom:'60px',
    }
  },

  imageSize: function () {
    return {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      minWidth:'50%',
      minHeight: '50%',
      maxWidth: 'initial',
      maxHeight:'initial',
      display: 'none',
    }
  },

  image: function () {
    if (this.props.collection.image) {
      const space = ' '
      const re = new RegExp(space, 'g')
      return this.props.collection.image['thumbnail/medium'].contentUrl.replace(re, '%20')
    } else {
      return '/images/marble.jpg'
    }
  },

  description: function () {
    if (this.props.collection.description) {
      return (
        <CardText style={{ height: '100px' }}>
          {$(this.props.collection.description).text()}
        </CardText>
      )
    }
  },

  headerTitle: function () {
    if (this.props.headerTitle) {
      return (<CardTitle title={this.props.headerTitle} />)
    }
  },

  cardTitle: function () {
    const titleStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
    return (
      <CardTitle
        title={this.props.collection.name_line_1}
        titleStyle={titleStyle}
        subtitle={this.props.collection.name_line_2}
        subtitleStyle={titleStyle}
      />
    )
  },

  cardMedia: function () {
    return (
      <CardMedia
        mediaStyle={{
          background:'url("' + this.image() + '")',
          paddingBottom:'46.85%',
          backgroundSize:'cover',
          backgroundPosition:'top center',
          height:'100%',
          width:'100%',
          overflow:
          'hidden',
        }}
        className='temp'
        style={{ overflow:'hidden' }}
      >
        <img src={this.image()} style={this.imageSize()} />
      </CardMedia>)
  },

  actionButtonsStyle: function () {
    return {
      position: 'absolute',
      bottom:'0',
      width: '100%',
      borderTopColor: 'rgba(0,0,0,0.12)',
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
    }
  },

  exploreLabelStyle: function () {
    return { color: '#d9a91b' }
  },

  collectionLink: function () {
    if (this.props.collection.external_url) {
      return (
        <a href={CollectionUrl.collectionUrl(this.props.collection)}>
          {this.headerTitle()}
          {this.cardMedia()}
          {this.cardTitle()}
        </a>
      )
    }
    return (
      <Link to={CollectionUrl.collectionUrl(this.props.collection)}>
        {this.headerTitle()}
        {this.cardMedia()}
        {this.cardTitle()}
      </Link>
    )
  },

  render: function () {
    return (

      <Card style={this.style()}>
        {this.collectionLink()}
        <CardActions style={this.actionButtonsStyle()}>
          <FlatButton
            label='Explore'
            href={CollectionUrl.collectionUrl(this.props.collection)}
            labelStyle={this.exploreLabelStyle()}
          />
        </CardActions>
      </Card>

    )
  },
})

// each file will export exactly one component
module.exports = CollectionCard
