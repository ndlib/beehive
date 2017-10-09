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
var ConfigurationActions = require("../../actions/ConfigurationActions.js");
var ConfigurationStore = require("../../store/ConfigurationStore.js");

var Search = React.createClass({
  mixins: [
    require('../../mixins/LoadRemoteMixin.jsx'),
    require('../../mixins/MuiThemeMixin.jsx')
  ],

  propTypes: {
    compact: React.PropTypes.bool,
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

  getDefaultProps: function() {
    return {
      compact: false,
      footerHeight: 50
    }
  },

  getInitialState: function() {
    return {
      windowHeight: this.calcHeight()
    };
  },

  componentWillMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded);
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

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    this.setState({
      windowHeight: this.calcHeight()
    });
  },

  calcHeight: function() {
    return window.innerHeight - (this.props.compact ? 0: this.props.footerHeight);
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
      path += "&compact=" + this.props.compact;
      window.history.replaceState({ store: SearchStore.getQueryParams() }, '', path);

    }
  },

  configurationLoaded: function(){
    this.setState({ configurationLoaded: true });
  },

  // Callback from LoadRemoteMixin when remote collection is loaded
  setValues: function(collection) {
    ConfigurationActions.load(collection);
    SearchActions.loadSearchResults(collection, this.props.hits, this.props.searchTerm, this.facetObject(), this.props.sortTerm, this.props.start, this.props.view);
    return true;
  },

  onWindowPopState: function(event) {
    if(event.state.store){
      SearchActions.reloadSearchResults(event.state.store);
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
        { !this.props.compact && <CollectionPageHeader collection={SearchStore.collection} ></CollectionPageHeader> }
        <ItemPanel height={ this.state.windowHeight } currentItem={this.props.currentItem}/>
        <SearchControls searchStyle={{height:'50px'}}/>
        <PageContent fluidLayout={false}>
          <SearchDisplayList compact={ this.props.compact } />
        </PageContent>
        { !this.props.compact && <CollectionPageFooter collection={SearchStore.collection} height={this.props.footerHeight}/> }
      </mui.AppCanvas>
    );
  }
});

module.exports = Search;
