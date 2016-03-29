'use strict'
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');
var SideNavButton = require("../../other/SideNavButton.jsx");
var OverlayPage = require("../../layout/OverlayPage.jsx");
var SearchStore = require('../../store/SearchStore.js');
var ItemShow = require('../../display/ItemShow.jsx');
var ItemActions = require('../../actions/ItemActions.jsx');
var EventEmitter = require('../../middleware/EventEmitter.js');
var OpenItemDisplay = require('../../modules/OpenItemDisplay.js');
var HoneycombURL = require('../../modules/HoneycombURL.js');

var ItemPanel = React.createClass({
  mixins: [
    require('../../mixins/CurrentThemeMixin.jsx'),
    require('../../mixins/CollectionUrlMixin.jsx'),
    require('../../mixins/LoadRemoteMixin.jsx') ],

  displayName: 'Item Panel',
  propTypes: {
    title: React.PropTypes.string,
    previousUrl: React.PropTypes.string,
    nextUrl: React.PropTypes.string,
    currentItem: React.PropTypes.string,
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
    if(this.props.currentItem) {
      var url = HoneycombURL() + '/v1/items/' + this.props.currentItem;
      this.loadRemoteItem(url);
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
    OpenItemDisplay(this.state.currentItem.id);
  },

  removeCurrentItem: function() {
    this.setState({
      currentItem: null,
    });
  },

  closeButtonClick: function() {
    ItemActions.hideItemDialogWindow();
    var path = window.location.pathname;
    var searchStr = window.location.search;
    var removeStr = '&item=' + this.state.currentItem.id;
    searchStr = searchStr.replace(removeStr, '');
    history.pushState({}, '', path + searchStr);
    this.removeCurrentItem();
  },

  nextButtonClick: function() {
    if(this.state.nextItem) {
      this.loadRemoteItem(this.state.nextItem["@id"]);
      OpenItemDisplay(this.state.nextItem["@id"].split("/").pop(), 'item');
    }
  },

  prevButtonClick: function() {
    if(this.state.previousItem) {
      this.loadRemoteItem(this.state.previousItem["@id"]);
      OpenItemDisplay(this.state.previousItem["@id"].split("/").pop(), 'item');
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

module.exports = ItemPanel;
