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

  render: function() {
    if(this.props.sortOptions.length > 0) {
      return(
      <div id="search-sort">
        <mui.List
          subheader="Sort By"
          style={{backgroundColor: 'transparent'}}
        />
        <SelectField
          ref='searchSort'
          autoWidth={false}
          onChange={this.onChange.bind(this, 'selectValue')}
          menuItems={this.props.sortOptions}
          labelStyle={{color: 'white', padding: '0 1em',}}
          style={{backgroundColor: 'rgba(0, 0, 0, 0.541176)', width: '100%', paddingRight: '1em',}}
          selectedIndex={this.props.selectedIndex > -1 ? this.props.selectedIndex : 0}
          displayMember='name'
          underlineStyle={{margin: '0'}}
          valueMember='value'
        />
        </div>
      );
    }
    else {
      return null;
    }
  }
});
module.exports = SearchSort
