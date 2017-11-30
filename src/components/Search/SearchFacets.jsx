import React from 'react'
import createReactClass from 'create-react-class'
import { List } from 'material-ui'
const SearchStore = require('../../store/SearchStore.js')
const FacetItem = require('./FacetItem.jsx')

const SearchFacets = createReactClass({
  values: function (facet) {
    if (facet.values) {
      return (facet.values.map(function (e, index) {
        let selectedValue
        if (SearchStore.facetOption) {
          if (facet.field === encodeURIComponent(SearchStore.facetOption.name)) {
            selectedValue = SearchStore.facetOption.value
          }
        }
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
        <List
          key={index}
          subheader={e.name}
        >
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

module.exports = SearchFacets
