import React from 'react'
import createReactClass from 'create-react-class'
import { List } from '@material-ui/core'
import ListSubheader from '@material-ui/core/ListSubheader'
const SearchStore = require('../../store/SearchStore.js')
const FacetItem = require('./FacetItem.jsx')

const SearchFacets = createReactClass({
  values: function (facet) {
    if (facet.values) {
      return (facet.values.map(function (e, index) {
        return (
          <FacetItem
            field={facet.field}
            facet={e}
            key={index}
          />
        )
      }))
    }
    return null
  },

  facets: function () {
    return SearchStore.facets.map(function (e, index) {
      return (
        <List key={index}>
          <ListSubheader>{e.name}</ListSubheader>
          {this.values(e)}
        </List>
      )
    }.bind(this))
  },

  render: function () {
    return (
      <div>
        {this.facets()}
      </div>
    )
  },
})

export default SearchFacets
