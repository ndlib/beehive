'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton');
var SideNavButton = require("../../other/SideNavButton");
var OverlayPage = require("../../layout/OverlayPage");
var SearchStore = require('../../../stores/Search');

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
      nextItem: null,
      previousItem: null
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
    var previousItem = SearchStore.getPreviousItem(item);
    var nextItem = SearchStore.getNextItem(item);
    this.setState({
      currentItem: item,
      nextItem: nextItem,
      previousItem: previousItem,
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
    if(this.state.nextItem) {
      this.loadRemoteItem(this.state.nextItem["@id"]);
    }
  },

  prevButtonClick: function() {
    if(this.state.previousItem) {
      this.loadRemoteItem(this.state.previousItem["@id"]);
    }
  },

  render: function() {
    if (!this.state.currentItem) {
      return (<div />);
    }

    return (
      <OverlayPage
        title={this.state.currentItem.name}
        onCloseButtonClick={this.closeButtonClick}
        onNextButtonClick={this.state.nextItem ? this.nextButtonClick : null}
        onPrevButtonClick={this.state.previousItem ? this.prevButtonClick : null}
      >
        <ItemShow item={this.state.currentItem} />
      </OverlayPage>
    );
  }
});

// each file will export exactly one component
module.exports = ItemPanel;
