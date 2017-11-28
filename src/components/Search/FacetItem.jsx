
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { ListItem, FontIcon } from 'material-ui'
var SearchStore = require('../../store/SearchStore.js');
var SearchActions = require('../../actions/SearchActions.js');
var FacetItem = createReactClass({

  propTypes: {
    field: PropTypes.string.isRequired,
    facet: PropTypes.object.isRequired,
  },

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


  isSelected: function() {
    if(SearchStore.facetOption) {
      for(var i = 0; i < SearchStore.facetOption.length; i++){
        if(this.props.facet.name === decodeURIComponent(SearchStore.facetOption[i].value)) {
          return true;
        }
      }
    }
    return false;
  },

  leftIcon: function() {
    if(this.isSelected()) {
      return (<FontIcon className="material-icons" style={this.checkBoxStyle()}>check_box</FontIcon>);
    } else {
      return (<FontIcon className="material-icons" style={this.checkBoxStyle()}>check_box_outline_blank</FontIcon>);
    }
  },

  checkBoxStyle: function() {
    return {
      fontSize: '24px',
      top: '-6px',
      width: '24px'
    };
  },

  render() {
    return (
      <ListItem
        key={this.props.facet.name}
        primaryText={<span style={{marginLeft:'30px', display: 'inline-block', maxWidth: 'calc(100% - 60px)'}}>{this.props.facet.name}</span>}
        secondaryText={"(" + this.props.facet.count + ")"}
        value={this.props.field +"|"+ this.props.facet.name}
        onClick={this.valueOnClick}
        innerDivStyle={{padding:'10px 16px'}}
        className="facet"
        leftIcon={this.leftIcon()}
      />
     );
  }
})

export default FacetItem;
