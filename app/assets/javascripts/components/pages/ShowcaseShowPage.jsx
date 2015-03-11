//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var ShowcaseShowPage = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      showcase: null,
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
      showcase: collection.showcases,
    });
  },

  render: function() {
    return (
      <Layout>
        <CollectionPageHeader collection={this.state.collection} />
        <PageContent>
          <ShowcaseShow showcase={this.state.showcase} />
        </PageContent>
      </Layout>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShowPage;
