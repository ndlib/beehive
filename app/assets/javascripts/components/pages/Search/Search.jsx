'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemPanel = require("./ItemPanel");
var SearchActions = require('../../../actions/SearchActions');
var SearchActionTypes = require('../../../constants/SearchActionTypes');
var SearchStore = require('../../../stores/SearchStore');

var Search = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin ],

  propTypes: {
    hits: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    searchTerm: React.PropTypes.string,
    sortTerm: React.PropTypes.string,
    facet: React.PropTypes.object,
    start: React.PropTypes.number,
    view: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      items: [],
      sortOptions: [],
      selectedIndex: 0,
      found: 0,
      start: 0,
    };
  },

  searchStoreChanged: function(reason) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: SearchStore.collection,
      facets: SearchStore.facets,
      sortOptions: SearchStore.sorts,
      selectedIndex: SearchStore.selectedPageIndex,
      items: SearchStore.items,
      found: SearchStore.found,
      start: SearchStore.start,
    });

    if(reason == "load") {
      var hash = window.location.hash;
      var path = window.location.origin + SearchStore.searchUri() + hash;
      window.history.pushState({ store: SearchStore.getQueryParams() }, '', path);
    }
  },

  // Callback from LoadRemoteMixin when remote collection is loaded
  setValues: function(collection) {
    SearchActions.loadSearchResults(collection, this.props.hits, this.props.searchTerm, this.facetObject(), this.props.sortTerm, this.props.start, this.props.view);
    return true;
  },

  onWindowPopState: function(event) {
    if(event.state){
      SearchActions.reloadSearchResults(event.state.store);
    }
  },

  componentWillMount: function() {
    SearchStore.on("SearchStoreChanged", this.searchStoreChanged);
    SearchStore.on("SearchStoreQueryFailed", function(result) { window.location = window.location.origin + '/404' });
    window.addEventListener("popstate", this.onWindowPopState);

    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  facetObject: function() {
    var facet;
    if(this.props.facet) {
      var facetKey = Object.keys(this.props.facet)[0];
      facet = { name: facetKey, value: this.props.facet[facetKey] };
    }
    return facet;
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} ></CollectionPageHeader>

        <ItemPanel />

        <SearchControls
          collection={this.state.collection}
          searchTerm={this.props.searchTerm}
          sortOptions={this.state.sortOptions}
          selectedIndex={this.state.selectedIndex}
          searchStyle={{height:'50px'}}
        />

        <PageContent fluidLayout={false}>
          <SearchDisplayList
            collection={this.state.collection}
            items={this.state.items}
            facets={this.state.facets}
            sortOptions={this.state.sortOptions}
            searchTerm={this.props.searchTerm}
            selectedIndex={this.state.selectedIndex}
            selectedFacet={this.facetObject()}
            found={this.state.found}
            start={this.state.start}
          />
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = Search;
