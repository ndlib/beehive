'use strict'
var React = require('react');
var mui = require('material-ui');
var EventEmitter = require("../../../EventEmitter");
var theme = require('../../../themes/beehive');
var MediaQuery = require('react-responsive');
var SearchStore = require('../../../stores/SearchStore');

var SearchDisplayList = React.createClass({
  mixins: [CollectionUrlMixin, MuiThemeMixin ],

  getInitialState: function () {
    return {
      sidebar: false,
      view: SearchStore.view,
    };
  },

  componentDidMount: function() {
    if(SearchStore.sorts || SearchStore.facets) {
      this.setState({sidebar: true});
    }
  },

  componentWillMount: function() {
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on("SearchStoreViewChanged", this.storeViewChanged);
  },

  storeViewChanged: function() {
    this.setState({ view: SearchStore.view });
  },

  itemList: function() {
    var view = this.state.view;
    var itemNodes = SearchStore.items.map(function(item, index) {
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
            <SearchPagination />
          </mui.Paper>
        </MediaQuery>

        <MediaQuery minWidth={700}>
          <SearchSidebar show={this.state.sidebar} />

          <mui.Paper style={{width: "74%"}} zDepth={0}>
            {this.itemList()}
            <SearchPagination />
          </mui.Paper>
        </MediaQuery>
      </div>
    );
  },
});

module.exports = SearchDisplayList;
