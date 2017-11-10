var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../../themes/beehive.jsx');

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var PagesShow = require('../Pages/PagesShow.jsx');

const LoadRemote = require('../../modules/LoadRemote.jsx')

var About = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState: function() {
    return {
      collection: {},
      remoteCollectionLoaded: false,
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.onLoaded.bind(this));
    }
  },

  onLoaded: function(result) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: result
    })
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    var pageContent = null;
    if(this.state.collection && this.state.collection.about) {
      pageContent = (
        <PagesShow title="About" content={this.state.collection.about} />
      )
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={true}/>
          <PageContent>
            {pageContent}
          </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    )
  }
});

module.exports = About;
