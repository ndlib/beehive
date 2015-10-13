//app/assets/javascripts/components/Showcase.jsx
var React = require('react');

var Showcase = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteMixin],

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
      currentSection: null,
    };
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      showcase: collection.showcases,
    }, this.handleResize);
  },

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.setCurrentSection);
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection)
    }
  },

  setCurrentSection: function(section) {
    this.setState({currentSection: section});
  },

  render: function() {
    var showcaseShow;
    if (this.state.showcase) {
      showcaseShow = (
        <ShowcaseShow height={this.state.height} collection={this.state.collection} showcase={this.state.showcase} />
      );
    } else {
      showcaseShow = (<Loading />);
    }
    return (
      <div>
        <Layout>
          <CollectionPageHeader collection={this.state.collection} dropdown={true} />
          <PageContent fluidLayout={true}>
            {showcaseShow}
          </PageContent>
        </Layout>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Showcase;
