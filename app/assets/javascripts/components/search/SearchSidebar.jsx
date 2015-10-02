'use strict'
var React = require('react');
var mui = require('material-ui');

var SearchSidebar = React.createClass({
  mixins: [PageHeightMixin, MuiThemeMixin],
  propTypes: {
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

  render: function() {
    var searchSort;
    if(this.props.sortOptions && this.props.sortOptions.length > 1) {
        searchSort = (<SearchSort
          collection={this.props.collection}
          sortOptions={this.props.sortOptions}
          selectedIndex={this.props.selectedIndex}
        />);
    }
    return (
      <div style={{minHeight: this.getHeight()}}>
        <div
            className={this.state.show ? "row-fluid col-sm-2" : "row-fluid col-sm-1"}
            style={{
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
            position: 'absolute',
            top: '0',
            bottom: '0',
            display: this.state.show ? 'block' : 'none',
          }}
        >
          <div
            style={{
              color: 'rgba(0, 0, 0, 0.870588)',
              marginTop: '2rem',
              marginBottom: '1rem',
            }}
          >Choose from the options below to sort and filter the displayed items.</div>
          <hr/>
          {searchSort}
          <div className="row" />
          <hr/>
          <SearchFacets
            collection={this.state.collection}
            facets={this.props.facets}
            selectedFacet={this.props.selectedFacet}
          />
        </div>
        <div
          className={this.state.show ? "row-fluid col-sm-2" : "row-fluid col-sm-1" }
          style={{
            position: 'relative',
            overflow: 'visible',
            zIndex: '1',
          }}
        >
          <div style={{
            position:'absolute',
            right: '-20px',
            zInded: '100000',
          }}>
            <mui.FloatingActionButton
              backgroundColor="rgba(0, 0, 0, 0.541176);"
              style={{}}
              iconClassName={this.state.show ? 'mdi-navigation-chevron-left' : 'mdi-navigation-chevron-right'}
              mini={true}
              secondary={true}
              onClick={this.toggleSidebar}
            />
          </div>
        </div>
        <div className={this.state.show ? "row-fluid col-sm-10" : "row-fluid col-sm-11" }>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = SearchSidebar;
