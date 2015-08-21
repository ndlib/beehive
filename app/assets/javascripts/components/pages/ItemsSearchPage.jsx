'use strict'
var React = require('react');

var ItemsSearchPage = React.createClass({
  mixins: [SearchUrlMixin, PageHeightMixin, LoadRemoteMixin, SearchMixin],

  displayName: 'Items Search Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    hits: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    searchTerm: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      collection: {},
      items: [],
      sortOptions: [],
      selectedIndex: 0,
    };
  },

  componentWillMount: function() {
    this.initSearchStore();
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
    this.loadSearchResults(
      this.props.hits + "?q=" + encodeURIComponent(this.props.searchTerm)
    );
  },

  setValues: function(collection) {
    this.setState({
      collection: collection
    });
  },

  render: function() {
    return (
      <div className="items-list-page">
        <CollectionPageHeader collection={this.state.collection} dropdown={true} >
          <div className="bee-page-title-bar" style={{marginBottom: "0",}}>
            <h2 className="bee-page-title-bar-title">Browse Collection</h2>
          </div>
        </CollectionPageHeader>
        <div className="clearfix" />
        <Layout>

          <PageContent>
            <SearchDisplayList
              collection={this.state.collection}
              items={this.state.items}
              facets={this.state.facets}
              sortOptions={this.state.sortOptions}
              searchTerm={this.props.searchTerm}
              selectedIndex={this.state.selectedIndex} />
          </PageContent>
        </Layout>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

module.exports = ItemsSearchPage;
