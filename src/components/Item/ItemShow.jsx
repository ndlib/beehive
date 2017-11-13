'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');
var SideNavButton = require("../../other/SideNavButton.jsx");
var PageContent = require('../../layout/PageContent.jsx');
var SearchStore = require('../../store/SearchStore.js');
var ItemContent = require('./ItemContent.jsx');

const CurrentTheme = require('../../modules/CurrentTheme.jsx')
const CollecitonUrl = require('../../modules/CollectionUrl.jsx')

var ItemShow = React.createClass({
  propTypes: {
    height: React.PropTypes.number,
    item: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
      position: "fixed",
      width: "80%"
    }
  },

  closeButtonStyle: function () {
    return {
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
      height: "100%",
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

  toolbar: function() {
    return (
      <mui.Toolbar style={this.styles()} >
        <mui.ToolbarGroup key={0} float="left">
          <mui.ToolbarTitle text={this.props.title}  style={this.titleStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right" style={this.closeButtonStyle()}>
          <CloseButton alternate={true} />
        </mui.ToolbarGroup>
      </mui.Toolbar>
    )
  },

  nextButton: function() {
    let nextItem = SearchStore.getNextItem(this.props.item)
    if(nextItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(nextItem)} rightIcon={true} />);
    }
    return "";
  },

  prevButton: function() {
    let previousItem = SearchStore.getPreviousItem(this.props.item)
    if(previousItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(previousItem)} />);
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
          <ItemContent item={this.props.item} height={ this.props.height } />
        </mui.Paper>
      </PageContent>
    );
  }
});

// each file will export exactly one component
module.exports = ItemShow;
