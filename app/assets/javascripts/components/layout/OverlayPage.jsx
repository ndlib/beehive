'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../other/CloseButton');
var SideNavButton = require("../other/SideNavButton");

var OverlayPageShow = React.createClass({
  mixins: [ CurrentThemeMixin, PageHeightMixin ],
  propTypes: {
    title: React.PropTypes.string,
    onPrevButtonClick: React.PropTypes.func,
    onNextButtonClick: React.PropTypes.func,
    onCloseButtonClick: React.PropTypes.func,
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
      height: this.getHeight() + "px",
      width: "100%",
      position: "fixed",
      backgroundColor: this.getCurrentPallette().canvasColor,
      zIndex: "1000",
    }
  },

  toolbar: function() {
    return (
      <mui.Toolbar style={this.styles()} >
        <mui.ToolbarGroup key={0} float="left" >
          <mui.ToolbarTitle text={this.props.title} style={this.titleStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          {this.closeButton()}
        </mui.ToolbarGroup>
      </mui.Toolbar>
    )
  },

  closeButton: function() {
    if(this.props.onCloseButtonClick) {
      return (<CloseButton clickEvent={this.props.onCloseButtonClick} />);
    }
    return "";
  },

  nextButton: function() {
    if(this.props.onNextButtonClick) {
      return (<SideNavButton onClick={this.props.onNextButtonClick} rightIcon={true} />);
    }
    return "";
  },

  prevButton: function() {
    if(this.props.prevButtonClick) {
      return (<SideNavButton onClick={this.props.onPrevButtonClick} />);
    }
    return "";
  },

  render: function() {
    return (
      <mui.Paper style={this.pageStyles()}>
        {this.toolbar()}
        {this.prevButton()}
        {this.nextButton()}
        {this.props.children}
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = OverlayPageShow;
