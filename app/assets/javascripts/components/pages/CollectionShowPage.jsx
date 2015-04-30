//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShowPage = React.createClass({
  mixins: [PageHeightMixin],

  displayName: 'Collection Show Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection();
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setState({
        collection: result,
      });
    }.bind(this));
  },

  componentWillMount: function(){
    document.body.className = "collection";
  },

  render: function() {
    var showcasesList;
    if (this.state.collection.showcases) {
      showcasesList = (
        <ShowcasesList showcases={this.state.collection.showcases} />
      );
    }
    return (
      <div>
        <CollectionBackground collection={this.state.collection} />
        <CollectionDescriptionModal collection={this.state.collection} height={this.state.height} />
        <Layout>
          <CollectionPageHeader collection={this.state.collection} />
          <PageContent>
            <CollectionShow collection={this.state.collection} />
            {showcasesList}
          </PageContent>
        </Layout>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionShowPage;
