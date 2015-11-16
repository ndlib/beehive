'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");

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
      var nodes = [];
      nodes.push((
        <ItemListItem item={item} view={view}/>
      ));
      return nodes;
    });
    if(itemNodes.length === 0) {
      itemNodes.push((<div style={{color:'rgba(0, 0, 0, 0.870588)', fontStyle:'italic', textAlign:'center'}}>No matching results could be found.</div>));
    }
    if (view == 'grid') {
      return (
        <mui.GridList style={ {width: "74%" } } >
          {itemNodes}
        </mui.GridList>
      )
    } else {
      return (
        <mui.List style={ {width: "74%"} }>
          {itemNodes}
        </mui.List>
      )
    }
  },

  render: function() {
    return (
      <mui.Paper style={{width: "100%"}} zDepth={0}>
        <SearchControls collection={this.props.collection} searchTerm={this.props.searchTerm}/>

        <h2>{this.props.found} Search Results</h2>

        <SearchSidebar
          collection={this.props.collection}
          show={this.state.sidebar}
          facets={this.props.facets}
          sortOptions={this.props.sortOptions}
          selectedIndex={this.props.selectedIndex}
          selectedFacet={this.props.selectedFacet}
        >
        </SearchSidebar>
        {this.itemList()}
        <SearchPagination
          collection={this.props.collection}
          found={this.props.found}
          start={this.props.start}
        />
    </mui.Paper>
    );
  },
});

module.exports = SearchDisplayList;
