'use strict'
var React = require('react');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var MenuItem = mui.MenuItem;
var SearchSort = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    sortOptions: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      sortOptions: [
        {text: 'Item Name', payload: 'name', direction: 'dsc'},
        {text: 'Creator', payload: 'creator', direction: 'asc'}
      ]
    };
  },

  getInitialState: function() {
    var state = {
      hintText: 'Sort Results',
    }
    return state;
  },

  searchUrl: function(sort) {
    var searchTerm = "/search" + window.location.search.split('&', 1);
    var sortTerm = "&sort=[]" +sort.payload + " " + sort.direction;
    var url = window.location.origin + "/" +this.props.collection.id + "/" + this.props.collection.slug + searchTerm + sortTerm;
    return url;
  },

  onChange: function(prop, e) {
    var change = {};
    change[prop] = e.target.value;
    window.location.assign(this.searchUrl(change.selectValue));
    this.setState({hintText: ''});
  },

  render: function() {
    return(
      <SelectField
        value={null}
        ref='sortType'
        hintText={this.state.hintText}
        onChange={this.onChange.bind(null, 'selectValue')}
        menuItems={this.props.sortOptions}
        style={{float:'right', marginLeft: '2em'}}
      />
    );
  }
});
module.exports = SearchSort
