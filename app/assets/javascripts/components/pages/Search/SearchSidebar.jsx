'use strict'
var React = require('react');
var mui = require('material-ui');

var SearchSidebar = React.createClass({
  mixins: [PageHeightMixin],
  propTypes: {
    collection: React.PropTypes.array,
    facets: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    selectedFacet: React.PropTypes.object,
    sortOptions: React.PropTypes.array,
  },

  getInitialState: function () {
    return {
      show: true
    };
  },

  toggleSidebar: function() {
    this.setState({show: !this.state.show});
  },

  searchSort: function() {
    var searchSort;
    if(this.props.sortOptions && this.props.sortOptions.length > 1) {
        searchSort = (<SearchSort
          collection={this.props.collection}
          sortOptions={this.props.sortOptions}
          selectedIndex={this.props.selectedIndex}
        />);
    }
    return searchSort;
  },

  render: function() {
    return (
      <mui.Paper style={{display: this.state.show ? 'block' : 'none', minHeight: this.getHeight(), width: "25%", float: "right"}} >
        <h3>Filter Results</h3>
        <hr/>
        {this.searchSort()}
        <hr/>
        <SearchFacets collection={this.props.collection} facets={this.props.facets} selectedFacet={this.props.selectedFacet} />
      </mui.Paper>
    );
  }
});

module.exports = SearchSidebar;
