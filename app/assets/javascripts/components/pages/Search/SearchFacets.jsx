'use strict'
var React = require('react');
var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;

var SearchFacets = React.createClass({
  mixins: [SearchUrlMixin],
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    facets: React.PropTypes.array,
    selectedFacet: React.PropTypes.object,
  },

  facetList: function() {
    return (
      <List
        ref='searchFacet'
        subheader="Filter Results"
        style={{backgroundColor: 'transparent'}}>
        {this.facets()}
      </List>
    );
  },

  facetOnClick: function(e) {
    e.currentTarget.getAttribute("value");
  },

  valueOnClick: function(parentFacet, e) {
    window.searchStore.facetOption = {}
    window.searchStore.facetOption.name = parentFacet;
    window.searchStore.facetOption.value = e.currentTarget.getAttribute("value");
    window.location.assign(this.searchUrl(this.props.collection));
  },

  facets: function(){
    console.log(this);
    self = this;
    var facets = this.props.facets.map(function(e, index) {
      var nodes = [];
      nodes.push((
        <List
          subheader={e.name}
        >
          {self.values(e)}
        </List>
      ));
      return nodes;
    });
    return facets;
  },

  values: function(facet) {
    self = this;
    var parentFacet = facet.field;
    var values;
    if (facet.values) {
      var values = facet.values.map(function(e, index) {
        var nodes = [];
        var value = encodeURIComponent(e.name);
        var primaryText = (
          <span>{e.name} <span style={{color: 'rgba(0, 0, 0, 0.541176)', fontStyle:'italic', fontSize: '.8em',}}>({e.count})</span></span>
        );
        nodes.push((
          <ListItem
            primaryText={primaryText}
            value={value}
            onClick={self.valueOnClick.bind(this, parentFacet)}
          />
        ));
        return nodes;
      });
      return (
        {values}
      );
    };
  },

  componentWillMount: function() {
    this.initSearchStore();
    if(this.props.selectedFacet){
      var key = Object.keys(this.props.selectedFacet)[0];
      var value = encodeURIComponent(this.props.selectedFacet[key]);
      window.searchStore.facetOption = {
        name: key,
        value: value,
      };
    }
  },

  render: function() {
    return (
      <div>
        {this.facetList()}
      </div>
    );
  }
});

module.exports = SearchFacets;
