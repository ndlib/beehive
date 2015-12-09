'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton');
var SideNavButton = require("../../other/SideNavButton");
var OverlayPage = require("../../layout/OverlayPage");

var ItemPanel = React.createClass({
  mixins: [ CurrentThemeMixin, CollectionUrlMixin, LoadRemoteMixin ],

  displayName: 'Item Panel',
  propTypes: {
    title: React.PropTypes.string,
    previousUrl: React.PropTypes.string,
    nextUrl: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      currentItem: null,
    };
  },

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.setCurrentItem);
    EventEmitter.on("HideItemDialogWindow", this.removeCurrentItem);
    window.addEventListener("popstate", this.handleHash);
    this.handleHash();
  },

  handleHash: function() {
    if(window.location.hash) {
      var url = this.remoteItem(window.location.hash.replace("#", ""));
      this.loadRemoteItem(url);
    } else {
      ItemActions.hideItemDialogWindow();
    }
  },

  setCurrentItem: function(item) {
    this.setState({
      currentItem: item,
    });
  },

  removeCurrentItem: function() {
    this.setState({
      currentItem: null,
    });
  },

  closeButtonClick: function() {
    ItemActions.hideItemDialogWindow();
    window.location.hash = "";
  },

  nextButtonClick: function() {
    //console.log("next");
    ItemActions.showItemDialogWindow(this.state.currentItem);
  },

  prevButtonClick: function() {
    //console.log("previous");
    ItemActions.showItemDialogWindow(this.state.currentItem);
  },

  render: function() {
    if (!this.state.currentItem) {
      return (<div />);
    }

    return (
      <OverlayPage
        title={this.state.currentItem.name}
        onCloseButtonClick={this.closeButtonClick}
        onNextButtonClick={this.nextButtonClick}
        onPrevButtonClick={this.prevButtonClick}
        >
        <ItemShow item={this.state.currentItem} />
      </OverlayPage>
    );
  }
});

// each file will export exactly one component
module.exports = ItemPanel;
