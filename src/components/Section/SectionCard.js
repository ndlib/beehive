import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import TextCard from './TextCard'
import ImageCard from './ImageCard'
import MultimediaCard from './MultimediaCard'
import CollectionUrl from '../../modules/CollectionUrl'
import ManuscriptIcon from 'assets/images/pt.icon.drk.png'

const SectionCard = createReactClass({
  propTypes: {
    section: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  },

  getInitialState: function () {
    return {
      fullItem: {},
      itemLoaded: false,

    }
  },

  style: function () {
    const styles = {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginRight: '20px',
      marginLeft: (this.props.section.has_spacer ? '15em' : '0px'),
      height: `${this.props.height}px`,
      cursor: 'pointer',
      lineHeight: '0px',
      backgroundColor: 'rgba(51,51,51,0.95)',
      border: this.sectionType() === 'image' ? 'solid 3px #fff' : 'none',
      overflow: 'hidden',
    }
    if (this.sectionType() === 'text') {
      styles.maxWidth = '33em'
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
      case 'text':
        return (<TextCard section={this.props.section} />)
      case 'multimedia':
        return (<MultimediaCard section={this.props.section} />)
      default:
        return (<div />)
    }
  },

  manifestIcon: function (item) {
    if (item && item.metadata && item.metadata.manuscript_url) {
      return (
        <img
          src={ManuscriptIcon}
          className='manuscript-icon'
          alt='Manifest Available'
          title='Manifest Available'
          style={{ position: 'absolute', right: '0', top: '0', maxWidth: '10%', height: 'auto' }}
        />
      )
    }
    return null
  },

  pushUrl: function (e) {
    if (e.target.tagName.toLowerCase() !== 'a') {
      e.preventDefault()
      const path = CollectionUrl.sectionObjectUrl(this.props.section)
      this.props.history.push(path)
    }
  },

  render: function () {
    return (
      <div style={{ display: 'inline' }}>
        <Link to={CollectionUrl.sectionObjectUrl(this.props.section)} />
        <Card className='item' style={this.style()} onClick={this.pushUrl}>
          {this.card()}
          {this.manifestIcon(this.props.section.item)}
        </Card>
      </div>
    )
  },
})

export default withRouter(SectionCard)
