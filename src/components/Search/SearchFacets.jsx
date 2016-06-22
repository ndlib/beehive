'use strict'
var React = require('react');
var mui = require('material-ui');
var List = mui.List;
var SearchActions = require('../../actions/SearchActions.js');
var SearchStore = require('../../store/SearchStore.js');
var FacetItem = require('./FacetItem.jsx');

var SearchFacets = React.createClass({
  mixins: [
    require('../../mixins/CurrentThemeMixin.jsx')
  ],

  valueOnClick: function(e) {
    var values = e.currentTarget.getAttribute("value").split("|");
    if(SearchStore.facetOption) {
      for(var i = 0; i < SearchStore.facetOption.length; i++) {
        if (SearchStore.facetOption[i].name === values[0] && SearchStore.facetOption[i].value === values[1]) {
          SearchStore.removeSelectedFacet({ name: values[0], value: values[1] });
          return
        }
      }
    }
    SearchActions.setSelectedFacet({ name: values[0], value: values[1] });
  },

  values: function(facet) {
    var parentFacet = facet.field;
    if (facet.values) {
      return (facet.values.map(function(e, index) {
        var selectedKey;
        var selectedValue;
        if(SearchStore.facetOption) {
          selectedKey = encodeURIComponent(SearchStore.facetOption.name);
          if(parentFacet == selectedKey) {
            selectedValue = SearchStore.facetOption.value;
          }
        }
        return (
          <FacetItem
            field={ facet.field}
            facet={ e }
            clickAction={ this.valueOnClick }
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
