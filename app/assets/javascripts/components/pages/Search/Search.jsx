'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemPanel = require("./ItemPanel");

var Search = React.createClass({
  mixins: [SearchUrlMixin, LoadRemoteMixin, SearchMixin, MuiThemeMixin ],

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    hits: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    searchTerm: React.PropTypes.string,
    sortTerm: React.PropTypes.string,
    facet: React.PropTypes.object,
    start: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      collection: {},
      items: [],
      sortOptions: [],
      selectedIndex: 0,
      found: 0,
      start: 0,
    };
  },

  componentWillMount: function() {
    this.initSearchStore();
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
    var url = this.props.hits + "?q=" + encodeURIComponent(this.props.searchTerm);
    if(this.props.facet) {
      var key = Object.keys(this.props.facet)[0];
      var value = encodeURIComponent(this.props.facet[key]);
      url += "&facets[" + key + "]=" + value;
    }
    if(this.props.sortTerm) {
      url += "&sort=" + this.props.sortTerm;
    }

    var regex = /\S+&start=/;
    var requestedStart = 0;
    if(window.location.search.match(regex)) {
      requestedStart = window.location.search.replace(regex, '').split('&')[0];
    }
    url += "&start=" + requestedStart;
    this.loadSearchResults(url);
  },

  setValues: function(collection) {
    this.setState({
      collection: collection
    });
  },

  render: function() {
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} ></CollectionPageHeader>

        <ItemPanel />

        <PageContent fluidLayout={false}>
          <SearchDisplayList
            collection={this.state.collection}
            items={this.state.items}
            facets={this.state.facets}
            sortOptions={this.state.sortOptions}
            searchTerm={this.props.searchTerm}
            selectedIndex={this.state.selectedIndex}
            selectedFacet={this.props.facet}
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
