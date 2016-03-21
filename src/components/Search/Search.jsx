'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemPanel = require("./ItemPanel.jsx");

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var SearchControls = require('./SearchControls.jsx');
var SearchStore = require('../../store/SearchStore.js');
var SearchActions = require('../../actions/SearchActions.js');
var SearchDisplayList = require('./SearchDisplayList.jsx');

var Search = React.createClass({
  mixins: [
    require('../../mixins/LoadRemoteMixin.jsx'),
    require('../../mixins/MuiThemeMixin.jsx')
  ],

  propTypes: {
    hits: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    searchTerm: React.PropTypes.string,
    sortTerm: React.PropTypes.string,
    facet: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    start: React.PropTypes.number,
    view: React.PropTypes.string,
    currentItem: React.PropTypes.string,
  },

  searchStoreChanged: function(reason) {
    this.setState({
      readyToRender: true,
    });

    if(reason == "load") {
      var currentItem = '';
      if(this.props.currentItem) {
        currentItem = '&item=' + this.props.currentItem;
      }
      var path = window.location.origin + SearchStore.searchUri() + currentItem;
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
    SearchStore.on("SearchStoreQueryFailed",
      function(result) {
        window.location = window.location.origin + '/404'
      }
    );
    window.addEventListener("popstate", this.onWindowPopState);

    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  // Translates the facet option given in props to the structure the SearchStore expects.
  facetObject: function() {
    var facets;
    if(this.props.facet) {
      facets = new Array()
      for(var i = 0; i < this.props.facet.length; i++){
        var facetKey = Object.keys(this.props.facet[i])[0];
        var facetValue = Object.keys(this.props.facet[i])[1];
        facets.push({
          name: this.props.facet[i][facetKey],
          value: this.props.facet[i][facetValue]
        });
      }
    }
    return facets;
  },

  render: function() {
    // All children of this object expect the collection and all data to be loaded into the SearchStore.
    // This will prevent mounting them until ready.
    if(!this.state.readyToRender) {
      return null;
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={SearchStore.collection} ></CollectionPageHeader>
        <ItemPanel currentItem={this.props.currentItem}/>
        <SearchControls searchStyle={{height:'50px'}}/>
        <PageContent fluidLayout={false}>
          <SearchDisplayList />
        </PageContent>
        <CollectionPageFooter collection={SearchStore.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = Search;
