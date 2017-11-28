
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
var CloseButton = require('../../other/CloseButton.jsx');
var SideNavButton = require("../../other/SideNavButton.jsx");

var ItemContent = require('../Item/ItemContent.jsx');
var SectionShowDescription = require('./SectionShowDescription.jsx');
var SideNavButton = require('../../other/SideNavButton.jsx');

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var SectionShow = createReactClass({
  displayName: 'Section Show',
  propTypes: {
    section: PropTypes.object,
    previousSection: PropTypes.object,
    nextSection: PropTypes.object,
    height: PropTypes.number,
    collection: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  styles: function () {
    return {
      backgroundColor: "rgba(51,51,51,1)",
      overflow: 'hidden',
    }
  },

  titleStyle: function () {
    return {
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
      lineHeight: BrowserUtils.mobile() ? '24px' : '56px',
    }
  },

  closeButtonStyle: function () {
    return {
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
      height: "100%",
      float: 'right'
    }
  },

  pageStyles: function() {
    return {
      height: this.props.height + "px",
      width: "100%",
      position: "fixed",
      backgroundColor: CurrentTheme.getCurrentPallette(this.context.muiTheme).canvasColor,
      zIndex: "4",
    }
  },

  title: function() {
    if (this.props.section.item) {
      return this.props.section.item.name;
    } else {
      return this.props.section.name;
    }
  },

  closeUrl: function() {
    var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/);
    return collectionPath[0]
  },

  toolbar: function() {
    return (
      <Toolbar style={this.styles()} >
        <ToolbarGroup key={0} style={{maxWidth: this.mobile ? '80%': '90%', float: 'left'}}>
          <ToolbarTitle text={this.title()} style={this.titleStyle()} />
        </ToolbarGroup>
        <ToolbarGroup key={1} style={this.closeButtonStyle()}>
          <CloseButton alternate={true} />
        </ToolbarGroup>
      </Toolbar>
    )
  },

  contentSection: function() {
    if (this.props.section.item) {
      return (<ItemContent height={this.props.height} item={this.props.section.item} additionalDetails={this.props.section.description}/>)
    } else {
      return (<SectionShowDescription height={this.props.height} section={this.props.section} />)
    }
  },

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.section) {
      if(this.props.previousSection) {
        prev = (<SideNavButton href={CollectionUrl.sectionObjectUrl(this.props.previousSection)} />);
      }
      if(this.props.nextSection) {
        next = (<SideNavButton href={CollectionUrl.sectionObjectUrl(this.props.nextSection)} rightIcon={true} />);
      }

      return (
        <Paper style={this.pageStyles()}>
          {this.toolbar()}
          {prev}
          {next}
          {this.contentSection()}
        </Paper>);
    } else {
      return null;
    }
  }
});

// each file will export exactly one component
module.exports = SectionShow;
