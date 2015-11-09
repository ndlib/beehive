'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../other/CloseButton');
var SideNavButton = require("../other/SideNavButton");

var SectionShow = React.createClass({
  mixins: [ CurrentThemeMixin, LoadRemoteMixin ],

  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  closeDialog: function () {
    SectionActions.hideSectionDialogWindow();
  },

  styles: function () {
    return {
      backgroundColor: this.getCurrentPallette.primary3Color,
    }
  },

  titleStyle: function () {
    return {
      color: this.getCurrentPallette().textColor,
    }
  },

  pageStyles: function() {
    return {
      height: this.props.height + "px",
      width: "100%",
      position: "fixed",
      backgroundColor: this.getCurrentPallette().canvasColor,
      zIndex: "1000",
    }
  },

  title: function() {
    if (this.props.section.item) {
      return this.props.section.item.name;
    } else {
      return this.props.section.title;
    }
  },

  toolbar: function() {
    return (
      <mui.Toolbar style={this.styles()} >
        <mui.ToolbarGroup key={0} float="left" >
          <mui.ToolbarTitle text={this.title()} style={this.titleStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          <CloseButton clickEvent={this.closeDialog} />
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
    window.location.hash = id;
    if(url.indexOf('item') > -1) {
      this.loadRemoteItem(url);
    }
    else if(url.indexOf('section') > -1) {
      this.loadRemoteSection(url);
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
        prev = (<SideNavButton clickEvent={this.clickPrevEvent} />);
      }
      if(this.props.nextUrl) {
        next = (<SideNavButton clickEvent={this.clickNextEvent} rightIcon={true} />);
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
