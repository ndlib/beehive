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
      <mui.Paper style={{minHeight: this.getHeight(), width: "25%", float: "right"}} >
        <div style={{ display: this.state.show ? 'block' : 'none', }} >
          <div>Choose from the options below to sort and filter the displayed items.</div>
          <hr/>
          {this.searchSort()}
          <div className="row" />
          <hr/>

        </div>
        <div
          style={{
            position: 'relative',
            overflow: 'visible',
            zIndex: '1',
          }}
        >
          <div style={{
            position:'absolute',
            zInded: '100',
          }}>
            <mui.FloatingActionButton
              mini={true}
              secondary={true}
              onClick={this.toggleSidebar}
            >
              <mui.FontIcon className="material-icons">{this.state.show ? 'chevron_left' : 'chevron_right'}</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
        </div>
      </mui.Paper>
    );
  }
});

module.exports = SearchSidebar;
