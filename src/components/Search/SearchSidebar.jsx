
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from 'material-ui'
var SearchFacets = require('./SearchFacets.jsx');

var SearchSidebar = createReactClass({

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
      <Paper style={{display: this.state.show ? 'block' : 'none', width: "25%", float: "right"}} >
        <h3 style={{paddingLeft:'16px'}}>Filter Results</h3>
        <hr/>
        <SearchFacets/>
      </Paper>
    );
  }
});

module.exports = SearchSidebar;
