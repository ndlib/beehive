'use strict'
var React = require('react');
var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;
var SearchStore = require('../../../stores/SearchStore');
var SearchActions = require("../../../actions/SearchActions");

var SearchFacets = React.createClass({
  mixins: [CurrentThemeMixin],

  getInitialState: function() {
    return {
      selectedFacet: SearchStore.selectedFacet
    };
  },

  facetOnClick: function(e) {
    e.currentTarget.getAttribute("value");
  },

  valueOnClick: function(e) {
    var values = e.currentTarget.getAttribute("value").split("|");
    if(SearchStore.facetOption) {
      if (SearchStore.facetOption.name &&
          SearchStore.facetOption.value == values[1]) {
        this.setFacet([null, null]);
      }
      else {
        this.setFacet(values);
      }
    }
    else {
      this.setFacet(values);
    }
  },

  setFacet: function(values) {
    SearchActions.setSelectedFacet({ name: values[0], value: values[1] });
  },

  facets: function(){
    self = this;
    return SearchStore.facets.map(function(e, index) {
      return (
        <List
          key={e.name}
          subheader={e.name}
        >
          {self.values(e)}
        </List>
      );
    });
  },

  values: function(facet) {
    self = this;
    var parentFacet = facet.field;
    if (facet.values) {
      return (facet.values.map(function(e, index) {
        var selectedKey;
        var selectedValue;
        if(self.state.selectedFacet) {
          selectedKey = encodeURIComponent(self.state.selectedFacet.name);
          if(parentFacet == selectedKey) {
            selectedValue = self.state.selectedFacet.value;
          }
        }
        return (
          <ListItem
            key={e.name}
            primaryText={<span style={{marginLeft:'30px'}}>{e.name}</span>}
            secondaryText={"(" + e.count + ")"}
            value={parentFacet +"|"+ e.name}
            onClick={self.valueOnClick}
            innerDivStyle={{padding:'10px 16px'}}
            className="facet"
            leftIcon={e.name == selectedValue ?  ( <mui.FontIcon className="material-icons" style={{fontSize: '28px', left: '-6px', top: '-6px', width: '24px' }}>check_circle</mui.FontIcon>) : null}
          />
        );
      }));
    }
    return (<div></div>);
  },

  searchStoreChanged() {
    this.setState({ selectedFacet: SearchStore.facetOption });
  },

  componentWillMount: function() {
    SearchStore.on("SearchStoreChanged", this.searchStoreChanged);
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
