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

    if(window.location.hash) {
      var url = this.remoteItem(window.location.hash.replace("#", ""));
      this.loadRemoteItem(url);
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
    if (!this.state.currentItem) {
      return (<div />);
    }

    return (
      <OverlayPage
        title={this.state.currentItem.name}
        closeButtonClick={ItemActions.hideItemDialogWindow}
        >
        <ItemShow item={this.state.currentItem} />
      </OverlayPage>
    );
  }
});

// each file will export exactly one component
module.exports = ItemPanel;
