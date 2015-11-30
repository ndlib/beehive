'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");
var theme = require('../../../themes/beehive');

var SearchDisplayList = React.createClass({
  mixins: [CollectionUrlMixin, MuiThemeMixin ],

  propTypes: {
    collection: React.PropTypes.object,
    items: React.PropTypes.array,
    facets: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    sortOptions: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    selectedFacet: React.PropTypes.object,
    found: React.PropTypes.number,
    start: React.PropTypes.number,
  },

  getInitialState: function () {
    var storedState = JSON.parse(localStorage.getItem("ListViewLayout"));
    var view = 'grid';
    if(storedState) {
      view = storedState.view;
    }
    return {
      sidebar: false,
      view: view,
    };
  },

  getDefaultProps: function() {
    return {
      items: [],
      facets: [],
      searchTerm: "",
      found: 0,
      start: 0,
    };
  },

  componentDidMount: function() {
    if(this.props.sortOptions || this.props.facets) {
      this.setState({sidebar: true});
    }
  },

  componentWillMount: function() {
    EventEmitter.on("SetGridList", this.setGridListState);
  },

  setGridListState: function(view) {
    this.setState({view: view});
  },

  nextUrl: function(index) {
    var id;
    if (index <  window.searchStore.items.length - 1) {
      id = window.searchStore.items[index + 1];
    }
    return id;
  },

  prevUrl: function(index) {
    var id;
    if (index > 0) {
      id = window.searchStore.items[index - 1];
    }
    return id;
  },

  itemList: function() {
    var view = this.state.view;
    var itemNodes = this.props.items.map(function(item, index) {
      return (
        <ItemListItem
          item={item}
          view={view}
          key={item.name}
        />
      );
    });
    if(itemNodes.length === 0) {
      itemNodes = (<div style={{color:'rgba(0, 0, 0, 0.870588)', fontStyle:'italic', textAlign:'center'}}>No matching results could be found.</div>);
    }
    if (view == 'grid') {
      return (
        <mui.GridList cellHeight={424} padding={theme.spacing.desktopGutter}>
          {itemNodes}
        </mui.GridList>
      )
    } else {
      return (
        <mui.List>
          {itemNodes}
        </mui.List>
      )
    }
  },

  render: function() {
    return (
      <div>
        <mui.Paper style={{width: "100%"}} zDepth={0}>
          <h3>Browse Collection</h3>
        </mui.Paper>

        <SearchSidebar
          collection={this.props.collection}
          show={this.state.sidebar}
          facets={this.props.facets}
          selectedFacet={this.props.selectedFacet}
        />
        <mui.Paper style={{width: "74%"}} zDepth={0}>
          {this.itemList()}

          <SearchPagination
            collection={this.props.collection}
            found={this.props.found}
            start={this.props.start}
          />
        </mui.Paper>
      </div>
    );
  },
});

module.exports = SearchDisplayList;
