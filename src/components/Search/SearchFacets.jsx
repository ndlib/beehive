'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { List } from 'material-ui'
var SearchStore = require('../../store/SearchStore.js');
var FacetItem = require('./FacetItem.jsx');

var SearchFacets = createReactClass({
  values: function(facet) {
    if (facet.values) {
      return (facet.values.map(function(e, index) {
        var selectedValue;
        if(SearchStore.facetOption) {
          if(facet.field == encodeURIComponent(SearchStore.facetOption.name)) {
            selectedValue = SearchStore.facetOption.value;
          }
        }
        return (
          <FacetItem
            field={ facet.field}
            facet={ e }
            key={ e.name }
          />
        );
      }.bind(this)));
    }
    return null;
  },

  facets: function(){
    return SearchStore.facets.map(function(e, index) {
      return (
        <List
          key={e.name}
          subheader={e.name}
        >
          {this.values(e)}
        </List>
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.facets()}
      </div>
    );
  }
});

module.exports = SearchFacets;
