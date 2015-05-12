var React = require("react");

var CollectionIntroPage = React.createClass({
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

  render: function() {

    return (
      <div className="collection-intro-page">
        <Layout>
          <CollectionPageHeader collection={this.state.collection} dropdown={true} />
          <PageContent>
            <CollectionDescription collection={this.state.collection} />
            <StartShowcaseButton collection={this.state.collection} />
          </PageContent>
        </Layout>
      </div>
    );
  }
});

module.exports = CollectionIntroPage;
