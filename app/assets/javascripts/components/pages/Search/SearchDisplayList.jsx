'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");
var theme = require('../../../themes/beehive');
var MediaQuery = require('react-responsive');
var SearchStore = require('../../../stores/SearchStore');

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
    return {
      sidebar: false,
      view: SearchStore.view,
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
    SearchStore.on("SearchStoreChanged", this.storeViewChanged);
    SearchStore.on("SearchStoreViewChanged", this.storeViewChanged);
  },

  storeViewChanged: function() {
    this.setState({ view: SearchStore.view });
  },

  nextUrl: function(index) {
    var id;
    if (index <  SearchStore.items.length - 1) {
      id = SearchStore.items[index + 1];
    }
    return id;
  },

  prevUrl: function(index) {
    var id;
    if (index > 0) {
      id = SearchStore.items[index - 1];
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
        <div>
          <MediaQuery maxWidth={700}>
            <mui.GridList cols={1} cellHeight="auto" padding={theme.spacing.desktopGutter}>
              {itemNodes}
            </mui.GridList>
          </MediaQuery>
          <MediaQuery minWidth={700} maxWidth={1500}>
            <mui.GridList cols={2} cellHeight="auto" padding={theme.spacing.desktopGutter}>
              {itemNodes}
            </mui.GridList>
          </MediaQuery>
          <MediaQuery minWidth={1500}>
            <mui.GridList cols={3} cellHeight="auto" padding={theme.spacing.desktopGutter}>
              {itemNodes}
            </mui.GridList>
          </MediaQuery>
        </div>
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
        <MediaQuery maxWidth={700}>
          <mui.Paper zDepth={0}>
            {this.itemList()}

            <SearchPagination
              collection={this.props.collection}
              found={this.props.found}
              start={this.props.start}
            />
          </mui.Paper>
        </MediaQuery>

        <MediaQuery minWidth={700}>
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
        </MediaQuery>
      </div>
    );
  },
});

module.exports = SearchDisplayList;
