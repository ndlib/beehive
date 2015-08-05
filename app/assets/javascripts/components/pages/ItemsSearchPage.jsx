'use strict'
var React = require('react');

var ItemsSearchPage = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteCollectionMixin, SearchMixin],

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
    query_parameters: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      collection: {},
      items: [],
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
    this.loadSearchResults(this.props.hits + "?q=" + this.props.query_parameters);
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
            <SearchDisplayList items={this.state.items} />
          </PageContent>
        </Layout>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

module.exports = ItemsSearchPage;
