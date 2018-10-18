import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
const CloseButton = require('../../other/CloseButton.jsx')
const SideNavButton = require('../../other/SideNavButton.jsx')
const ItemContent = require('../Item/ItemContent.jsx')
const SectionShowDescription = require('./SectionShowDescription.jsx')
const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

const SectionShow = createReactClass({
  displayName: 'Section Show',
  propTypes: {
    section: PropTypes.object,
    previousSection: PropTypes.object,
    nextSection: PropTypes.object,
    height: PropTypes.number,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
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
    const collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/)
    return collectionPath[0]
  },

  toolbar: function () {
    return (
      <Toolbar id='PageTitleBar' style={this.styles()} >
        <ToolbarGroup key={0} style={{ maxWidth: this.mobile ? '80%' : '90%', float: 'left' }}>
          <h2><ToolbarTitle text={this.title()} style={this.titleStyle()} /></h2>
        </ToolbarGroup>
        <ToolbarGroup key={1} style={this.closeButtonStyle()}>
          <CloseButton alternate />
        </ToolbarGroup>
      </Toolbar>
    )
  },

  contentSection: function () {
    if (this.props.section.item) {
      return (<ItemContent
        height={this.props.height}
        item={this.props.section.item}
        additionalDetails={this.props.section.description}
      />)
    } else {
      return (<SectionShowDescription
        height={this.props.height}
        section={this.props.section}
      />)
    }
  },

  render: function () {
    let prev, next, offsetTop
    if (this.props.height) {
      offsetTop = this.props.height / 2
    }
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

module.exports = SectionShow
