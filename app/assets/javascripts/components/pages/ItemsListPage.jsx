//app/assets/javascripts/components/ItemsListPage.jsx
var React = require('react');

var ItemsListPage = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteCollectionMixin],

  displayName: 'Items List Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
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
      this.loadRemoteCollection(this.props.collection)
    }
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      items: collection.items,
    });
  },

  render: function() {
    return (
    <div>
      <ItemsModalList height={this.state.height} items={this.state.items} />
      <Layout>
          <CollectionPageHeader collection={this.state.collection} dropdown={true} />
          <PageContent>
            <ItemsList height={this.state.height} items={this.state.items} />
          </PageContent>
        </Layout>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = ItemsListPage;
