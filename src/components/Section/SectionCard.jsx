
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card } from 'material-ui'
var TextCard = require('./TextCard.jsx')
var ImageCard = require('./ImageCard.jsx')
var MultimediaCard = require('./MultimediaCard.jsx')
import { Link } from 'react-router-dom'

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var SectionCard = createReactClass({
  propTypes: {
    section: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
  },

  getInitialState: function () {
    return {
      fullItem: {},
      itemLoaded: false,

    }
  },

  style: function () {
    var styles = {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginRight: '20px',
      marginLeft: (this.props.section.has_spacer ? '15em' : '0px'),
      height: this.props.height + 'px',
      cursor: 'pointer',
      lineHeight: '0px',
      backgroundColor: 'rgba(51,51,51,0.95)',
      border: this.sectionType() == 'image' ? 'solid 3px #fff' : 'none',
      overflow: 'hidden',
    }
    if (this.sectionType() == 'text') {
      styles['maxWidth'] = '33em'
    }

    return styles
  },

  sectionType: function () {
    if (this.props.section.item) {
      if (this.props.section.item.media) {
        return 'image'
      } else if (this.props.section.item.multimedia) {
        return 'multimedia'
      }
    } else {
      return 'text'
    }
  },

  card: function () {
    switch (this.sectionType()) {
      case 'image':
        return (<ImageCard section={this.props.section} />)
        break
      case 'text':
        return (<TextCard section={this.props.section} />)
        break
      case 'multimedia':
        return (<MultimediaCard section={this.props.section} />)
        break
      default:
        return (<div />)
        break
    }
  },

  manifestIcon: function (item) {
    if (item && item.metadata && item.metadata.manuscript_url) {
      return (<img src='/images/pt.icon.drk.png' className='manuscript-icon' alt='Manifest Available' title='Manifest Available' style={{ position: 'absolute', right: '0', top: '0', maxWidth: '10%', height: 'auto' }} />)
    }
    return null
  },

  render: function () {
    return (
      <Link to={CollectionUrl.sectionObjectUrl(this.props.section)}>
        <Card className='item' style={this.style()}>
          { this.card() }
          {this.manifestIcon(this.props.section.item)}
        </Card>
      </Link>
    )
  },
})

// each file will export exactly one component
module.exports = SectionCard
