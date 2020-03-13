import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, Typography } from '@material-ui/core'
import CloseButton from '../../other/CloseButton.jsx'
import SideNavButton from '../../other/SideNavButton.jsx'
import ItemContent from '../Item/ItemContent.jsx'
import SectionShowDescription from './SectionShowDescription.jsx'
import BrowserUtils from '../../modules/BrowserUtils.jsx'
import CollectionUrl from '../../modules/CollectionUrl.jsx'

const SectionShow = createReactClass({
  displayName: 'Section Show',
  propTypes: {
    section: PropTypes.object,
    previousSection: PropTypes.object,
    nextSection: PropTypes.object,
    height: PropTypes.number,
  },

  styles: function () {
    return {
      backgroundColor: 'rgba(51,51,51,1)',
      overflow: 'hidden',
    }
  },

  titleStyle: function () {
    return {
      color: '#ffffff',
      lineHeight: BrowserUtils.mobile() ? '24px' : '56px',
    }
  },

  closeButtonStyle: function () {
    return {
      color: '#ffffff',
      height: '100%',
      float: 'right',
    }
  },

  pageStyles: function () {
    return {
      height: this.props.height + 'px',
      width: '100%',
      position: 'fixed',
      backgroundColor: '#ffffff',
      zIndex: '4',
    }
  },

  title: function () {
    if (this.props.section.item) {
      return this.props.section.item.name
    } else {
      return this.props.section.name
    }
  },

  closeUrl: function () {
    const collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/) // eslint-disable-line no-useless-escape
    return collectionPath[0]
  },

  toolbar: function () {
    return (
      <Toolbar className='title-bar' style={this.styles()}>
        <div style={{ maxWidth: this.mobile ? '80%' : '90%', float: 'left' }}>
          <Typography variant='h2' style={this.titleStyle()}>{this.title()}</Typography>
        </div>
        <div style={this.closeButtonStyle()}>
          <CloseButton alternate />
        </div>
      </Toolbar>
    )
  },

  contentSection: function () {
    if (this.props.section.item) {
      return (
        <ItemContent
          height={this.props.height}
          item={this.props.section.item}
          additionalDetails={this.props.section.description}
        />
      )
    } else {
      return (
        <SectionShowDescription
          height={this.props.height}
          section={this.props.section}
        />
      )
    }
  },

  render: function () {
    let prev, next
    if (this.props.section) {
      if (this.props.previousSection) {
        prev = (<SideNavButton href={CollectionUrl.sectionObjectUrl(this.props.previousSection)} />)
      }
      if (this.props.nextSection) {
        next = (<SideNavButton href={CollectionUrl.sectionObjectUrl(this.props.nextSection)} rightIcon />)
      }

      return (
        <Paper style={this.pageStyles()}>
          {this.toolbar()}
          {prev}
          {next}
          {this.contentSection()}
        </Paper>)
    } else {
      return null
    }
  },
})

export default SectionShow
