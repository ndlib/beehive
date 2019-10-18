import React from 'react'
import createReactClass from 'create-react-class'
import { Paper } from 'material-ui'
const SearchFacets = require('./SearchFacets.jsx')

const SearchSidebar = createReactClass({

  getInitialState: function () {
    return {
      show: this.props.show,
    }
  },

  toggleSidebar: function () {
    this.setState({ show: !this.state.show })
  },

  render: function () {
    return (
      <Paper style={{ display: this.state.show ? 'block' : 'none', width: '25%', float: 'right' }} >
        <h3 style={{ paddingLeft:'16px' }}>Filter Results</h3>
        <hr />
        <SearchFacets />
      </Paper>
    )
  },
})

module.exports = SearchSidebar
