var React = require("react");

var CollectionIntroPage = React.createClass({
  mixins: [LoadRemoteMixin],

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
    var nextShowcase;
    if (this.state.collection.showcases && this.state.collection.showcases.length > 0) {
      nextShowcase = (<MoreArrow showcase={this.state.collection.showcases[0]} />);
    }
    return (
      <div>
        <div className="collection-intro-page">
          <Layout>
            <CollectionPageHeader collection={this.state.collection} dropdown={true} >
              <div className="bee-page-title-bar"><h2 className="bee-page-title-bar-title">Introduction</h2></div>
            </CollectionPageHeader>
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
