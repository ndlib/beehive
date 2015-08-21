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
  },

  facetList: function() {
    return (
      <List
        ref='searchFacet'
        subheader="Filter Search"
        style={{backgroundColor: 'transparent'}}>
        {this.facets()}
      </List>
    );
  },

  facetOnClick: function(e) {
    console.log("FACET CLICK");
    console.log(e.currentTarget.getAttribute("value"));
  },

  valueOnClick: function(parentFacet, e) {
    window.searchStore.facetOption.name = parentFacet;
    window.searchStore.facetOption.value = e.currentTarget.getAttribute("value");
    window.location.assign(this.searchUrl(this.props.collection));
  },

  facets: function(){
    self = this;
    var facets = this.props.facets.map(function(e, index) {
      var nodes = [];
      nodes.push((
        <ListItem
          primaryText={e.name}
          open={true}
          onClick={self.facetOnClick}
          value={encodeURIComponent(e.field)}
        >
          {self.values(e)}
        </ListItem>
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
        nodes.push((
          <ListItem
            primaryText={e.name}
            secondaryText={e.count}
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
    window.searchStore.facetOption = {
      name: "",
      value: ""
    };
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
