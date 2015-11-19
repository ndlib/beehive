'use strict'
var React = require('react');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var MenuItem = mui.MenuItem;
var SearchSort = React.createClass({
  mixins: [SearchUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    sortOptions: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
  },

  getInitialState: function() {
    var state = {
      selectValue: 0,
    }
    return state;
  },

  getDefaultProps: function() {
    return {
      sortOptions: [],
      selectedIndex: -1,
    };
  },

  onChange: function(prop, e) {
    this.setSort(e.target.value);
    window.location.assign(this.searchUrl(this.props.collection));
  },

  setSort: function(sortOption) {
    window.searchStore.sortOption = sortOption;
  },

  componentWillMount: function() {
    this.initSearchStore();
    var regex = /\S+&sort=/;
    var sortOption = '';
    if(window.location.search.match(regex)) {
      sortOption = window.location.search.replace(regex, '').split('&')[0];
    }
    this.setSort(sortOption);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return(nextProps.selectedIndex !== this.props.selectedIndex);
  },

  sortStyle: function() {
    return ({
      display:'inline-block',
      borderRadius: '2px',
      overflow: 'hidden',
      width:'120px',
      verticalAlign: 'middle',
      marginLeft: '5px',
      background: 'url(/assets/arrowdown.gif) no-repeat 90% 50% #fff'
    });
  },

  sortSelectStyle: function() {
    return ({
      background: 'transparent',
      padding: '7px 8px',
      border: 'none',
      boxShadow: 'none',
      appearance: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      width: '130%',
      color: 'black'
    });
  },

  sortOptions: function() {
    return this.props.sortOptions.map(function(option) {
      return(<option value={option.value}>{option.name}</option>);
    });
  },

  selectedValue: function() {
    if (this.props.selectedIndex > -1 ) {
      return this.props.sortOptions[this.props.selectedIndex].value;
    } else {
      return this.props.sortOptions[0].value
    }
  },

  render: function() {
    if(this.props.sortOptions.length > 0) {
      return(
      <div style={{float: "left", padding: '10px', paddingTop: '15px', color: 'white', fontSize: '16px'}}>
        Sort By:
        <div style={this.sortStyle()}>
          <select
            ref='searchSort'
            autoWidth={false}
            onChange={this.onChange.bind(this, 'selectValue')}
            menuItems={this.props.sortOptions}
            defaultValue={this.selectedValue()}
            style={this.sortSelectStyle()}
          >
          {this.sortOptions()}
          </select>
        </div>
      </div>
      );
    }
    else {
      return null;
    }
  }
});
module.exports = SearchSort
