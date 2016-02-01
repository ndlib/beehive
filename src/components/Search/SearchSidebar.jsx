'use strict'
var React = require('react');
var mui = require('material-ui');
var SearchFacets = require('./SearchFacets.jsx');

var SearchSidebar = React.createClass({

  getInitialState: function () {
    return {
      show: true
    };
  },

  toggleSidebar: function() {
    this.setState({show: !this.state.show});
  },

  render: function() {
    return (
      <mui.Paper style={{display: this.state.show ? 'block' : 'none', width: "25%", float: "right"}} >
        <h3 style={{paddingLeft:'16px'}}>Filter Results</h3>
        <hr/>
        <SearchFacets/>
      </mui.Paper>
    );
  }
});

module.exports = SearchSidebar;
