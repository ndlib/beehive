'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");
var CloseButton = require('../../other/CloseButton');
var MediaQuery = require('react-responsive');

var gridView = {view: "grid"};
var listView = {view: "list"};

var SearchControls = React.createClass({
  mixins: [CurrentThemeMixin, CollectionUrlMixin, SearchUrlMixin],

  propTypes: {
    collection: React.PropTypes.object,
    searchTerm: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    sortOptions: React.PropTypes.array,
  },

  getInitialState: function() {
    var state = {
      view: null,
    }
    return state;
  },

  controlsStyle: function() {
    return {
      position: "fixed",
      minHeight: "65px",
      zIndex: "1",
    };
  },

  toggleView: function() {
    if (this.state.view == "grid") {
      this.setList();
    }
    else if(this.state.view == "list") {
      this.setGrid();
    }
  },

  setGrid: function() {
    this.storeView("grid");
    this.addViewToUrl("grid");
  },

  setList: function() {
    this.storeView("list");
    this.addViewToUrl("list");
  },

  checkView: function(view) {
    if(view == 'list' || view == 'grid') {
        return true;
    }
    return false
  },

  componentWillMount: function() {
    var regex = /\S+&view=/;
    var view;
    var urlView = window.location.search.replace(regex, '');
    var storedState = JSON.parse(localStorage.getItem("ListViewLayout"));

    // check url for a valid view
    if(this.checkView(urlView)) {
      view = urlView;
    }
    // next check localStorage
    else if(storedState && this.checkView(storedState.view)) {
      view = storedState.view;
      this.addViewToUrl(view);
    }
    // if we still don't have a view give it a default
    else {
      view = 'grid';
      this.addViewToUrl(view);
    }
    this.storeView(view);
  },

  storeView: function(view) {
    this.setState({view: view});
    localStorage.setItem("ListViewLayout", JSON.stringify({view: view}));
    EventEmitter.emit('SetGridList', view);
  },

  addViewToUrl: function(view) {
    var searchString = window.location.search;
    var regex = /\S+&view=/;
    var garbage;
    if(searchString.indexOf('&view=') > -1) {
      garbage = searchString.replace(regex, '');
      searchString = searchString.replace('&view=' + garbage, '');
    }
    var url = searchString + '&view=' + view;
    window.history.pushState('', '', url);
  },

  render: function() {
    return (
      <div style={{height: "65px" }}>
      <mui.Toolbar className="controls" style={this.controlsStyle()}>
        <mui.ToolbarGroup key={0} float="left">
          <SearchBox collection={this.props.collection} searchTerm={this.props.searchTerm} primary={false} active={true} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          <MediaQuery minWidth={700}>
            <SearchSort
              collection={this.props.collection}
              sortOptions={this.props.sortOptions}
              selectedIndex={this.props.selectedIndex}
              />
          </MediaQuery>
          <mui.RaisedButton
            secondary={this.state.view == 'list'}
            onClick={this.setList}
            style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
          >
            <mui.FontIcon
              className="material-icons"
              style={this.state.view == 'list' ? this.lightIconStyle() : this.darkIconStyle()}
            >view_list</mui.FontIcon>
          </mui.RaisedButton>
          <mui.RaisedButton
            secondary={this.state.view == 'grid'}
            onClick={this.setGrid}
            style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
          >
            <mui.FontIcon
              className="material-icons"
              style={this.state.view == 'grid' ? this.lightIconStyle() : this.darkIconStyle()}
            >view_module</mui.FontIcon>
          </mui.RaisedButton>
        </mui.ToolbarGroup>
      </mui.Toolbar>
      </div>
    );

  }
});

module.exports = SearchControls;
