'use strict'
var React = require('react');
var mui = require('material-ui');
var ListItem = mui.ListItem;
var FontIcon = mui.FontIcon;
var SearchStore = require('../../store/SearchStore.js');

var FacetItem = React.createClass({

  propTypes: {
    field: React.PropTypes.string.isRequired,
    facet: React.PropTypes.object.isRequired,
    clickAction: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      isSelected: false,
    }
  },

  onClick: function(e) {
    this.props.clickAction(e);
  },

  isSelected: function() {
    if(SearchStore.facetOption) {
      for(var i = 0; i < SearchStore.facetOption.length; i++){
        if(encodeURIComponent(this.props.facet.name) === encodeURIComponent(decodeURIComponent(SearchStore.facetOption[i].value))) {
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
        onClick={this.onClick}
        innerDivStyle={{padding:'10px 16px'}}
        className="facet"
        leftIcon={this.leftIcon()}
      />
     );
  }
})

export default FacetItem;
