'use strict'
var React = require('react');
var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;

var SearchFacets = React.createClass({
  mixins: [SearchUrlMixin, CurrentThemeMixin],
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
    if(window.searchStore.facetOption) {
      if (window.searchStore.facetOption.name &&
          window.searchStore.facetOption.value == values[1]) {
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
    if(!window.searchStore.facetOption) {
      window.searchStore.facetOption = {};
    }
    window.searchStore.facetOption.name = values[0];
    window.searchStore.facetOption.value = values[1];
    window.location.assign(this.searchUrl(this.props.collection));
  },

  facets: function(){
    self = this;
    return this.props.facets.map(function(e, index) {
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
        var selectedKey = encodeURIComponent(parentFacet);
        var selectedValue;
        if(self.props.selectedFacet) {
          selectedValue = encodeURIComponent(self.props.selectedFacet[selectedKey]);
        }
        var value = encodeURIComponent(e.name);
        return (
          <ListItem
            key={e.name}
            primaryText={<span style={{marginLeft:'30px'}}>{e.name}</span>}
            secondaryText={"(" + e.count + ")"}
            value={parentFacet +"|"+ value}
            onClick={self.valueOnClick}
            innerDivStyle={{padding:'10px 16px'}}
            className="facet"
            leftIcon={value == selectedValue ?  ( <mui.FontIcon className="material-icons" style={{fontSize: '28px', left: '-6px', top: '-6px', width: '24px' }}>check_circle</mui.FontIcon>) : null}
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
