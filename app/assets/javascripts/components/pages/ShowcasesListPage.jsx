//app/assets/javascripts/components/ShowcasesListPage.jsx
var React = require('react');

var ShowcasesListPage = React.createClass({
  mixins: [LoadRemoteCollectionMixin],

  displayName: 'Showcase List Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      showcases: [],
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
      showcases: collection.showcases,
    });
  },

  render: function() {
    var showcasesList;
    if (this.state.showcases) {
      showcasesList = (
        <ShowcasesCardList showcases={this.state.showcases} />
      );
    }
    return (
      <Layout>
        <CollectionPageHeader collection={this.state.collection} />
        <PageContent>
          {showcasesList}
        </PageContent>
        <CollectionOverlayFooter collection={this.state.collection} />
      </Layout>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcasesListPage;
