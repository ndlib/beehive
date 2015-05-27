var React = require("react");

var CollectionIntroPage = React.createClass({
  mixins: [LoadRemoteCollectionMixin],

  displayName: "Collection Intro Page",

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
    if ("object" == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
    });
  },

  render: function() {
    var nextShowcase = ""
    if (this.state.collection.showcases) {
      nextShowcase = (<MoreArrow showcase={this.state.collection.showcases[0]} />);
    }
    return (
      <div>
        <div className="collection-intro-page">
          <Layout>
            <CollectionPageHeader collection={this.state.collection} dropdown={true} />
            <div className="intro-title-bar"><h2 className="intro-title-bar-title">Introduction</h2></div>
            <PageContent>
              <CollectionDescription collection={this.state.collection} />
            </PageContent>
          </Layout>
        </div>

        {nextShowcase}
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

module.exports = CollectionIntroPage;
