'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../other/CloseButton');

var SectionShow = React.createClass({
  mixins: [ CurrentThemeMixin ],

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

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.section) {
      if(this.props.previousUrl) {
        prev = (<PreviousModal url={this.props.previousUrl} />);
      }
      if(this.props.nextUrl) {
        next = (<NextModal url={this.props.nextUrl} />);
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
