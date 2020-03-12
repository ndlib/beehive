import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardActions, CardMedia, CardTitle, FloatingActionButton, FontIcon } from 'material-ui'
import { Link } from 'react-router-dom'
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

const SitePathCard = createReactClass({
  propTypes: {
    siteObject: PropTypes.object.isRequired,
    addNextButton: PropTypes.bool,
    fixedSize: PropTypes.bool,
    headerTitle: PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      addNextButton: false,
      headerTitle: null,
      fixedSize: true,
    }
  },

  style: function () {
    return {
      position: 'relative',
      cursor: 'pointer',
      minHeight: '400px',
      height: this.props.fixedSize ? '400px' : 'auto',
    }
  },

  imageSize: function () {
    return {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      minWidth:'50%',
      minHeight: '50%',
      maxWidth: 'initial',
      maxHeight:'initial',
      display: 'none',

    }
  },

  image: function () {
    const space = ' '
    const re = new RegExp(space, 'g')
    if (this.props.siteObject.image && this.props.siteObject.image['thumbnail/medium']) {
      return this.props.siteObject.image['thumbnail/medium'].contentUrl.replace(re, '%20')
    } else {
      return '/images/intro.jpg'
    }
  },

  nextButton: function () {
    if (this.props.addNextButton) {
      return (
        <CardActions
          style={{ position:'absolute', right:'10px', top: this.props.headerTitle != null ? '33px' : '363px' }}
        >
          <Link to={CollectionUrl.collectionObjectUrl(this.props.siteObject)}>
            <FloatingActionButton
              backgroundColor='#2c5882'
              disableTouchRipple
            >
              <FontIcon className='material-icons'>arrow_forward</FontIcon>
            </FloatingActionButton>
          </Link>
        </CardActions>
      )
    }
  },

  headerTitle: function () {
    if (this.props.headerTitle) {
      return (
        <CardTitle
          title={this.props.headerTitle}
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width:'100%',
            zIndex: '1',
          }}
        />
      )
    }
  },

  cardTitle: function () {
    return (
      <CardTitle
        title={this.props.siteObject.name_line_1 || this.props.siteObject.name}
        subtitle={this.props.siteObject.name_line_2}
      />
    )
  },

  cardMedia: function () {
    return (
      <CardMedia
        className='collection-site-path-card'
        style={{ backgroundImage:'url("' + this.image() + '")' }}
        overlay={this.cardTitle()}
      />
    )
  },

  render: function () {
    return (
      <Card style={this.style()}>
        <Link to={CollectionUrl.collectionObjectUrl(this.props.siteObject)}>
          {this.headerTitle()}
          {this.cardMedia()}
        </Link>
        {this.nextButton()}
      </Card>
    )
  },
})

export default SitePathCard
