'use strict'
var React = require('react');
var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;
var SearchActions = require('../../actions/SearchActions.js');
var SearchStore = require('../../store/SearchStore.js');

var SearchFacets = React.createClass({
  mixins: [
    require('../../mixins/CurrentThemeMixin.jsx')
  ],

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

  isSelected: function(name) {
    if(this.state.selectedFacet) {
      for(var i = 0; i < this.state.selectedFacet.length; i++){
        if(name == this.state.selectedFacet[i].value) {
          return true;
        }
      }
    }
    return false;

  },

  checkBoxStyle: function() {
    return {
      fontSize: '24px',
      top: '-6px',
      width: '24px'
    };
  },

  values: function(facet) {
    var parentFacet = facet.field;
    if (facet.values) {
      return (facet.values.map(function(e, index) {
        var selectedKey;
        var selectedValue;
        if(this.state.selectedFacet) {
          selectedKey = encodeURIComponent(this.state.selectedFacet.name);
          if(parentFacet == selectedKey) {
            selectedValue = this.state.selectedFacet.value;
          }
        }
        return (
          <ListItem
            key={e.name}
            primaryText={<span style={{marginLeft:'30px'}}>{e.name}</span>}
            secondaryText={"(" + e.count + ")"}
            value={parentFacet +"|"+ e.name}
            onClick={this.valueOnClick}
            innerDivStyle={{padding:'10px 16px'}}
            className="facet"
            leftIcon={this.isSelected(e.name) ?  (<mui.FontIcon className="material-icons" style={this.checkBoxStyle()}>check_box</mui.FontIcon>) :  ( <mui.FontIcon className="material-icons" style={this.checkBoxStyle()}>check_box_outline_blank</mui.FontIcon>)}
          />
        );
      }.bind(this)));
    }
    return (<div></div>);
  },

  searchStoreChanged() {
    this.setState({ selectedFacet: SearchStore.facetOption });
  },

  componentDidMount: function() {
    this.searchStoreChanged();
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
