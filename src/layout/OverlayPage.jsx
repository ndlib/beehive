'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../other/CloseButton.jsx');
var SideNavButton = require("../other/SideNavButton.jsx");
var PageContent = require('../layout/PageContent.jsx');

var OverlayPage = React.createClass({
  mixins: [
    require("../mixins/CurrentThemeMixin.jsx")
  ],
  propTypes: {
    title: React.PropTypes.string,
    onPrevButtonClick: React.PropTypes.func,
    onNextButtonClick: React.PropTypes.func,
    onCloseButtonClick: React.PropTypes.func,
    height: React.PropTypes.number,
  },

  styles: function () {
    return {
      backgroundColor: "rgba(51,51,51,1)",
      display: "block",
      overflow: "hidden"
    }
  },

  titleStyle: function () {
    return {
      color: this.getCurrentPallette().alternateTextColor,
      position: "fixed",
      width: "80%"
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

  toolbar: function() {
    return (
      <mui.Toolbar style={this.styles()} >
        <mui.ToolbarGroup key={0} float="left">
          <mui.ToolbarTitle text={this.props.title}  style={this.titleStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right" style={this.closeButtonStyle()}>
          {this.closeButton()}
        </mui.ToolbarGroup>
      </mui.Toolbar>
    )
  },

  closeButton: function() {
    if(this.props.onCloseButtonClick) {
      return (<CloseButton clickEvent={this.props.onCloseButtonClick} alternate={true} />);
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
    if(this.props.onPrevButtonClick) {
      return (<SideNavButton onClick={this.props.onPrevButtonClick} />);
    }
    return "";
  },

  render: function() {
    return (
      <PageContent fluidLayout={true}>
        <mui.Paper style={this.pageStyles()}>
          {this.toolbar()}
          {this.prevButton()}
          {this.nextButton()}
          {this.props.children}
        </mui.Paper>
      </PageContent>
    );
  }
});

// each file will export exactly one component
module.exports = OverlayPage;
