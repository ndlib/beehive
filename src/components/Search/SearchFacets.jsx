import React from 'react'
import createReactClass from 'create-react-class'
import { List } from 'material-ui'
import Subheader from 'material-ui/Subheader'
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
          <Subheader>{e.name}</Subheader>
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
