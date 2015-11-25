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

  facetOnClick: function(e) {
    e.currentTarget.getAttribute("value");
  },

  valueOnClick: function(e) {
    var values = e.currentTarget.getAttribute("value").split("|");
    window.searchStore.facetOption = {}
    window.searchStore.facetOption.name = values[0];
    window.searchStore.facetOption.value = values[1];
    window.location.assign(this.searchUrl(this.props.collection));
  },

  facets: function(){
    self = this;
    return this.props.facets.map(function(e, index) {
      return(
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
        var value = encodeURIComponent(e.name);
        return (
          <ListItem
            key={e.name}
            primaryText={e.name}
            secondaryText={"(" + e.count + ")"}
            value={parentFacet +"|"+ value}
            onClick={self.valueOnClick}
            innerDivStyle={{padding:'10px 16px'}}
            className="facet"
          />
        );
      }));
    }
    return (<div></div>);
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
        {this.facets()}
      </div>
    );
  }
});

module.exports = SearchFacets;
