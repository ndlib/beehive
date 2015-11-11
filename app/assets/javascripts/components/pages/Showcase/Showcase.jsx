'use strict'
var React = require('react');
var mui = require('material-ui');

var Showcase = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteMixin, MuiThemeMixin, CurrentThemeMixin],

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
    // this is a div instead of mui.AppCanvas because of a bug in 12.3 which is fixed in master.  
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} />
        <PageContent fluidLayout={true}>
          {showcaseShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

// each file will export exactly one component
module.exports = Showcase;
