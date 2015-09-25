//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var ShowcaseShowPage = React.createClass({
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
    //FIX THIS LINE
    EventEmitter.on("ItemDialogWindow", this.setCurrentSection);
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection)
    }
  },

  setCurrentSection: function() {
    this.setState({currentSection: section});
  },

  render: function() {
    var showcaseShow;
    if (this.state.showcase) {
      showcaseShow = (
        <ShowcaseShow height={this.state.height} showcase={this.state.showcase} />
      );
    } else {
      showcaseShow = (<Loading />);
    }
    return (
      <div>
        <DialogWindow>
          <SectionShow
            height={this.state.height}
            section={this.state.currentSection}
/*
            previousSection={this.props.previousSection}
            nextSection={this.props.nextSection}
*/
          />
        </DialogWindow>
        <Layout>
          <CollectionPageHeader collection={this.state.collection} dropdown={true} />
          <PageContent>
            {showcaseShow}
          </PageContent>
        </Layout>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShowPage;
