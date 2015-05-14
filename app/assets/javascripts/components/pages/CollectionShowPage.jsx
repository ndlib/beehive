//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShowPage = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteCollectionMixin],

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
      this.loadRemoteCollection(this.props.collection);
    }
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
    });
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " collection";
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
        <div className="collection-show-page">
          <CollectionBackground collection={this.state.collection} />
          <Layout>
          <CollectionPageHeader collection={this.state.collection} branding={true} />
<PageContent>
              <CollectionShow collection={this.state.collection} />
              <CollectionIntroLink collection={this.state.collection} height={this.state.height} />
              {showcasesList}
            </PageContent>
          </Layout>
        </div>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionShowPage;
