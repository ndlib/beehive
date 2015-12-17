'use strict'
var React = require('react');
var mui = require('material-ui');

var Showcase = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin, CurrentThemeMixin, BrowserMixin],

  getInitialState: function() {
    return {
      showcase: null,
      currentSection: null,
      height: window.innerHeight,
      widht: window.innerWidth,
    };
  },

  setValues: function(collection) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
      showcase: collection.showcases,
    }, this.handleResize);
    return true;
  },

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.setCurrentSection);

      var newMuiTheme = this.state.muiTheme;
      newMuiTheme.paper.backgroundColor = 'inherit';

      this.setState({
        muiTheme: newMuiTheme,
      });
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection(this.props.collection)
    }
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  },

  handleResize: function() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  },

  setCurrentSection: function(section) {
    this.setState({currentSection: section});
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    var showcaseShow;
    if (this.state.showcase) {
      showcaseShow = (
        <ShowcaseShow collection={this.state.collection} showcase={this.state.showcase} />
      );
    } else {
      showcaseShow = (<Loading />);
    }
    var header;
    if(!this.mobile()){
      header = (<CollectionPageHeader collection={this.state.collection} />);
    }
    // this is a div instead of mui.AppCanvas because of a bug in 12.3 which is fixed in master.
    return (
      <div style={{ backgroundColor: 'inherit' }}>
        {header}
        <PageContent fluidLayout={true}>
          {showcaseShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Showcase;
