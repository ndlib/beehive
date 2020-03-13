import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from '@material-ui/core'
const SearchFacets = require('./SearchFacets.jsx')

const SearchSidebar = createReactClass({
  propTypes: {
    show: PropTypes.bool,
  },

  render: function () {
    return (
      <Paper style={{ display: this.props.show ? 'block' : 'none', width: '25%', float: 'right' }}>
        <h3 style={{ paddingLeft:'16px' }}>Filter Results</h3>
        <hr />
        <SearchFacets />
      </Paper>
    )
  },
})

export default SearchSidebar
