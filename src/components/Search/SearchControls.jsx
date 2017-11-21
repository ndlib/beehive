'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, {FontIcon, Toolbar, ToolbarGroup, RaisedButton} from 'material-ui'
var MediaQuery = require('react-responsive');
var SearchBox = require('../../layout/SearchBox.jsx');
var SearchSort = require('./SearchSort.jsx');
var SearchStore = require('../../store/SearchStore.js');
var ConfigurationStore = require('../../store/ConfigurationStore.js');
var SearchActions = require('../../actions/SearchActions.js');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var gridView = {view: "grid"};
var listView = {view: "list"};

var SearchControls = createReactClass({
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
      zIndex: "2",
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
    if (ConfigurationStore.searchEnabled()) {
      return (<SearchBox primary={false} active={true} useStore={true} />);
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div style={{height: "65px" }}>
      <Toolbar className="controls" style={this.controlsStyle()}>
        <ToolbarGroup key={0} style={{float: 'left'}}>
          { this.searchBox() }
        </ToolbarGroup>
        <ToolbarGroup key={1} style={{float: 'right'}}>
          <MediaQuery minWidth={700}>
            <SearchSort/>
              <RaisedButton
                secondary={this.state.view == 'grid'}
                onClick={this.setList}
                style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
                disableTouchRipple={true}
              >
                <FontIcon
                  className="material-icons"
                  style={this.state.view == 'grid' ? CurrentTheme.lightIconStyle() : CurrentTheme.darkIconStyle()}
                >view_list</FontIcon>
              </RaisedButton>
              <RaisedButton
                secondary={this.state.view == 'list'}
                onClick={this.setGrid}
                style={{zIndex: '0', margin: '15px 0', minWidth: "44px", lineHeight: "36px"}}
                disableTouchRipple={true}
              >
                <FontIcon
                  className="material-icons"
                  style={this.state.view == 'list' ? CurrentTheme.lightIconStyle() : CurrentTheme.darkIconStyle()}
                >view_module</FontIcon>
              </RaisedButton>
          </MediaQuery>
        </ToolbarGroup>
      </Toolbar>
      </div>
    );

  }
});

module.exports = SearchControls;
