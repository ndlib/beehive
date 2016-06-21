'use strict'
var React = require('react');
var mui = require('material-ui');
var MediaQuery = require('react-responsive');
var SearchBox = require('../../layout/SearchBox.jsx');
var SearchSort = require('./SearchSort.jsx');
var SearchStore = require('../../store/SearchStore.js');
var SearchActions = require('../../actions/SearchActions.js');

var gridView = {view: "grid"};
var listView = {view: "list"};

var SearchControls = React.createClass({
  mixins: [
    require('../../mixins/CurrentThemeMixin.jsx'),
    require('../../mixins/CollectionUrlMixin.jsx')
  ],

  getInitialState: function() {
    var state = {
      view: SearchStore.view,
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
  },

  setList: function() {
    this.storeView("list");
  },

  checkView: function(view) {
    if(view == 'list' || view == 'grid') {
        return true;
    }
    return false
  },

  componentWillMount: function() {
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on("SearchStoreViewChanged", this.storeViewChanged);
  },

  storeView: function(view) {
    SearchActions.setView(view);
  },

  storeChanged: function() {
    this.setState({ view: SearchStore.view });
  },

  storeViewChanged: function() {
    this.setState({ view: SearchStore.view });
    var url = window.location.origin + SearchStore.searchUri();
    window.history.pushState({ store: SearchStore.getQueryParams() }, '', url);
  },

  searchBox: function() {
    if (SearchStore.searchEnabled()) {
      return (<SearchBox primary={false} active={true} useStore={true} />);
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div style={{height: "65px" }}>
      <mui.Toolbar className="controls" style={this.controlsStyle()}>
        <mui.ToolbarGroup key={0} float="left">
          { this.searchBox() }
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          <MediaQuery minWidth={700}>
            <SearchSort/>
              <mui.RaisedButton
                secondary={this.state.view == 'grid'}
                onClick={this.setList}
                style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
                disableTouchRipple={true}
              >
                <mui.FontIcon
                  className="material-icons"
                  style={this.state.view == 'grid' ? this.lightIconStyle() : this.darkIconStyle()}
                >view_list</mui.FontIcon>
              </mui.RaisedButton>
              <mui.RaisedButton
                secondary={this.state.view == 'list'}
                onClick={this.setGrid}
                style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
                disableTouchRipple={true}
              >
                <mui.FontIcon
                  className="material-icons"
                  style={this.state.view == 'list' ? this.lightIconStyle() : this.darkIconStyle()}
                >view_module</mui.FontIcon>
              </mui.RaisedButton>
          </MediaQuery>
        </mui.ToolbarGroup>
      </mui.Toolbar>
      </div>
    );

  }
});

module.exports = SearchControls;
