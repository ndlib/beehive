import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardActions, CardMedia, CardHeader, IconButton, Paper } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Link } from 'react-router-dom'
import Loading from '../../other/Loading.jsx'

import CollectionUrl from '../../modules/CollectionUrl.jsx'
import CurrentTheme from '../../modules/CurrentTheme.jsx'

const CollectionShow = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  collectionLoaded: function () {
    if (this.props.collection.name) {
      return true
    } else {
      return false
    }
  },

  image: function () {
    const space = ' '
    const re = new RegExp(space, 'g')
    return this.props.collection.image['thumbnail/medium'].contentUrl.replace(re, '%20')
  },

  startUrl: function () {
    let url = CollectionUrl.introUrl(this.props.collection)

    if (!url) {
      url = CollectionUrl.startSitePathUrl(this.props.collection)
    }

    return url
  },

  cover: function () {
    return ({
      backgroundSize:'cover',
      height:'40vw',
      maxHeight:'450px',
      backgroundImage: 'url("' + this.image() + '")',
      backgroundPosition:'top',
    })
  },

  startButton: function () {
    if (this.startUrl()) {
      return (
        <Link to={this.startUrl()} style={{ position: 'absolute', right: '0', top: '-30px' }}>
          <IconButton
            backgroundColor='#2c5882'
          >
            <ArrowForwardIcon className='material-icons' />
          </IconButton>
        </Link>
      )
    }
  },

  cardMediaSection: function () {
    if (this.props.collection.image) {
      let CardHeader = (null)
      if (this.props.collection.display_page_title) {
        CardHeader = (
          <CardHeader
            title={this.props.collection.name_line_1}
            titleStyle={{ color:'white', fontSize:'34px', lineHeight:'46px' }}
            subtitle={this.props.collection.name_line_2}
            subtitleStyle={{ color:'rgba(255,255,255,.8)', fontSize:'18px' }}
            style={CurrentTheme.pageWidth()}
          />
        )
      }
      return (
        <CardMedia overlay={CardHeader}>
          <img src={this.image()} className='hide' alt='' />
          <div className='cover' style={this.cover()} />
        </CardMedia>
      )
    } else {
      return (
        <CardHeader title={this.props.collection.name_line_1} subtitle={this.props.collection.name_line_2} />
      )
    }
  },

  render: function () {
    if (this.collectionLoaded()) {
      return (
        <Paper circle={false} rounded={false}>
          <Card>
            {this.cardMediaSection()}
          </Card>
          <CardActions style={CurrentTheme.pageWidth()} className='startButton'>
            {this.startButton()}
          </CardActions>
        </Paper>
      )
    } else {
      return <Loading />
    }
  },
})

export default CollectionShow
