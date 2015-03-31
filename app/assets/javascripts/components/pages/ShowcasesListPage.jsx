//app/assets/javascripts/components/ShowcasesListPage.jsx
var React = require('react');

var ShowcasesListPage = React.createClass({
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
      this.loadRemoteCollection()
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setValues(result);
    }.bind(this));
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
        <ShowcasesList showcases={this.state.showcases} />
      );
    }
    return (
      <Layout>
        <CollectionPageHeader collection={this.state.collection} />
        <PageContent>
          {showcasesList}
        </PageContent>
      </Layout>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcasesListPage;
