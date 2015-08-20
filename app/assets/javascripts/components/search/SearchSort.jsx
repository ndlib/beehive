'use strict'
var React = require('react');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var MenuItem = mui.MenuItem;
var SearchSort = React.createClass({
  mixins: [SearchUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    sortOptions: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      sortOptions: [
        {text: 'Item Name', value: 'dsc'},
        {text: 'Creator', value: 'asc'}
      ]
    };
  },

  getInitialState: function() {
    var state = {
      hintText: 'Sort Results',
    }
    return state;
  },

  onChange: function(prop, e) {
    var change = {};
    change[prop] = e.target.value;
    this.setSort(change.selectValue.value);
    window.location.assign(this.searchUrl(this.props.collection));
  },

  setSort: function(sortOption) {
    window.searchStore.sortOption = sortOption;
    this.setState({hintText: ''});
  },

  componentDidMount: function() {
    this.initSearchStore();
    this.setSort('');
  },

  render: function() {
    return(
      <SelectField
        value={null}
        ref='searchSort'
        hintText={this.state.hintText}
        onChange={this.onChange.bind(null, 'selectValue')}
        menuItems={this.props.sortOptions}
        style={{float:'right', marginLeft: '2em'}}
      />
    );
  }
});
module.exports = SearchSort
