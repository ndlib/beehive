'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');
var SideNavButton = require("../../other/SideNavButton.jsx");

var ItemShow = require('../../display/ItemShow.jsx');
var SectionShowDescription = require('./SectionShowDescription.jsx');
var SideNavButton = require('../../other/SideNavButton.jsx');
var SectionActions = require('../../actions/SectionActions.jsx');
var OpenItemDisplay = require('../../modules/OpenItemDisplay.js');

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

var SectionShow = React.createClass({
  mixins: [
    require('../../mixins/CurrentThemeMixin.jsx'),
  ],

  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  closeDialog: function () {
    SectionActions.hideSectionDialogWindow();
    history.pushState({}, '', window.location.pathname);
  },

  styles: function () {
    return {
      backgroundColor: "rgba(51,51,51,1)",
      overflow: 'hidden',
    }
  },

  titleStyle: function () {
    return {
      color: this.getCurrentPallette().alternateTextColor,
      lineHeight: BrowserUtils.mobile() ? '24px' : '56px',
    }
  },

  closeButtonStyle: function () {
    return {
      color: this.getCurrentPallette().alternateTextColor,
      height: "100%",
    }
  },

  pageStyles: function() {
    return {
      height: this.props.height + "px",
      width: "100%",
      position: "fixed",
      backgroundColor: this.getCurrentPallette().canvasColor,
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

  toolbar: function() {
    return (
      <mui.Toolbar style={this.styles()} >
        <mui.ToolbarGroup key={0} float="left" style={{maxWidth: this.mobile ? '80%': '90%'}}>
          <mui.ToolbarTitle text={this.title()} style={this.titleStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right" style={this.closeButtonStyle()}>
          <CloseButton clickEvent={this.closeDialog} alternate={true} />
        </mui.ToolbarGroup>
      </mui.Toolbar>
    )
  },

  contentSection: function() {
    if (this.props.section.item) {
      return (<ItemShow height={this.props.height} item={this.props.section.item} additionalDetails={this.props.section.description}/>)
    } else {
      return (<SectionShowDescription height={this.props.height} section={this.props.section} />)
    }
  },

  clickNextEvent: function(event) {
    if(this.props.nextUrl) {
      this.clickSideNavEvent(event, this.props.nextUrl);
    }
  },

  clickPrevEvent: function(event) {
    if(this.props.previousUrl) {
      this.clickSideNavEvent(event, this.props.previousUrl);
    }
  },

  clickSideNavEvent: function(event, url) {
    event.preventDefault();
    var id = url.split("/").pop();
    OpenItemDisplay(id, 'section');

    if(url.indexOf('item') > -1) {
      LoadRemote.loadRemoteItem(url);
    }
    else if(url.indexOf('section') > -1) {
      LoadRemote.loadRemoteSection(url);
    }
    else {
      console.log('an invalid url was provided', this.props.url);
    }
  },

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.section) {
      if(this.props.previousUrl) {
        prev = (<SideNavButton onClick={this.clickPrevEvent} />);
      }
      if(this.props.nextUrl) {
        next = (<SideNavButton onClick={this.clickNextEvent} rightIcon={true} />);
      }

      return (
        <mui.Paper style={this.pageStyles()}>
          {this.toolbar()}
          {prev}
          {next}
          {this.contentSection()}
        </mui.Paper>);
    } else {
      return null;
    }
  }
});

// each file will export exactly one component
module.exports = SectionShow;
