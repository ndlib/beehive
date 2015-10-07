'use strict'
var React = require('react');
var mui = require('material-ui');

var gridView = {view: "grid"};
var listView = {view: "list"};

var SearchControls = React.createClass({
  mixins: [MuiThemeMixin],

  propTypes: {
    collection: React.PropTypes.object,
    searchTerm: React.PropTypes.string,
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
      marginBottom: "20px",
      paddingLeft: "15px",
      paddingRight: "15px",
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
  },

  setList: function() {
    this.setState({view: "list"});
    localStorage.setItem("ListViewLayout", JSON.stringify(listView));
  },



  render: function() {
    return (
      <div className="controls" style={this.controlsStyle()}>
        <div className="col-lg-12" >
          <div className="pull-left">
            <SearchBox collection={this.props.collection} searchTerm={this.props.searchTerm}/>
          </div>
          <div className="pull-right">
            <mui.RaisedButton
              secondary={this.state.view == 'list'}
              onClick={this.setList}
              style={{zIndex: '0'}}
            >
              <mui.FontIcon
                className="material-icons"
                style={this.state.view == 'list' ? this.lightIconStyle() : this.darkIconStyle()}
              >view_list</mui.FontIcon>
              List
            </mui.RaisedButton>
            <mui.RaisedButton
              secondary={this.state.view == 'grid'}
              onClick={this.setGrid}
              style={{zIndex: '0'}}
            >
              <mui.FontIcon
                className="material-icons"
                style={this.state.view == 'grid' ? this.lightIconStyle() : this.darkIconStyle()}
              >view_module</mui.FontIcon>
              Grid
            </mui.RaisedButton>
          </div>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
      </div>
    );

  }
});

module.exports = SearchControls;
