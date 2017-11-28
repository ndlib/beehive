
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
var CloseButton = require('../../other/CloseButton.jsx')
var SideNavButton = require('../../other/SideNavButton.jsx')
var PageContent = require('../../layout/PageContent.jsx')
var SearchStore = require('../../store/SearchStore.js')
var ItemContent = require('./ItemContent.jsx')

const CurrentTheme = require('../../modules/CurrentTheme.jsx')
const CollecitonUrl = require('../../modules/CollectionUrl.jsx')

var ItemShow = createReactClass({
  propTypes: {
    height: PropTypes.number,
    item: PropTypes.object.isRequired,
  },

  styles: function () {
    return {
      backgroundColor: 'rgba(51,51,51,1)',
      display: 'block',
      overflow: 'hidden',
    }
  },

  titleStyle: function () {
    return {
      color: '#ffffff',
      position: 'fixed',
      width: '80%',
    }
  },

  closeButtonStyle: function () {
    return {
      color: '#ffffff',
      height: '100%',
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

  toolbar: function () {
    return (
      <Toolbar style={this.styles()} >
        <ToolbarGroup key={0} float='left'>
          <ToolbarTitle text={this.props.title} style={this.titleStyle()} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float='right' style={this.closeButtonStyle()}>
          <CloseButton alternate />
        </ToolbarGroup>
      </Toolbar>
    )
  },

  nextButton: function () {
    let nextItem = SearchStore.getNextItem(this.props.item)
    if (nextItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(nextItem)} rightIcon />)
    }
    return ''
  },

  prevButton: function () {
    let previousItem = SearchStore.getPreviousItem(this.props.item)
    if (previousItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(previousItem)} />)
    }
    return ''
  },

  render: function () {
    return (
      <PageContent fluidLayout>
        <Paper style={this.pageStyles()}>
          {this.toolbar()}
          {this.prevButton()}
          {this.nextButton()}
          <ItemContent item={this.props.item} height={this.props.height} />
        </Paper>
      </PageContent>
    )
  },
})

// each file will export exactly one component
module.exports = ItemShow
