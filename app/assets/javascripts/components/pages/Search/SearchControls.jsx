'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");
var CloseButton = require('../../other/CloseButton');

var gridView = {view: "grid"};
var listView = {view: "list"};

var SearchControls = React.createClass({
  mixins: [CurrentThemeMixin, CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object,
    searchTerm: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    sortOptions: React.PropTypes.array,
  },

  getInitialState: function() {
    var state = {
      view: "grid",
    };
    var storedState = JSON.parse(localStorage.getItem("ListViewLayout"));
    if(storedState) {
      state.view = storedState.view;
    }

    return state;
  },

  controlsStyle: function() {
    return {
      position: "fixed",
      minHeight: "65px",
      zIndex: "20",
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
    this.setState({view: "grid"});
    localStorage.setItem("ListViewLayout", JSON.stringify(gridView));
    EventEmitter.emit('SetGridList', 'grid');
  },

  setList: function() {
    this.setState({view: "list"});
    localStorage.setItem("ListViewLayout", JSON.stringify(listView));
    EventEmitter.emit('SetGridList', 'list');
  },

  render: function() {
    return (
      <div style={{height: "65px" }}>
      <mui.Toolbar className="controls" style={this.controlsStyle()}>
        <mui.ToolbarGroup key={0} float="left">
          <SearchBox collection={this.props.collection} searchTerm={this.props.searchTerm} primary={false} active={true} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          <mui.RaisedButton
            secondary={this.state.view == 'list'}
            onClick={this.setList}
            style={{zIndex: '0', margin: '10px 0', minWidth: "44px",}}
          >
            <mui.FontIcon
              className="material-icons"
              style={this.state.view == 'list' ? this.lightIconStyle() : this.darkIconStyle()}
            >view_list</mui.FontIcon>
          </mui.RaisedButton>
          <mui.RaisedButton
            secondary={this.state.view == 'grid'}
            onClick={this.setGrid}
            style={{zIndex: '0', margin: '10px 0', minWidth: "44px",}}
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
